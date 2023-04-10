import { parse } from "node-html-parser";
import type { SvelteComponent } from "svelte";

export type Entry = {
    component: typeof SvelteComponent;
    props?: Record<string, unknown>;
};

type BLOCKS = {
    Paragraph: typeof SvelteComponent;
    Heading: typeof SvelteComponent;
    Image: typeof SvelteComponent;
    ImageGallery: typeof SvelteComponent;
    Embed: typeof SvelteComponent;
    Bookmark: typeof SvelteComponent;
    Video: typeof SvelteComponent;
    Hr: typeof SvelteComponent;
    Button: typeof SvelteComponent;
    Header: typeof SvelteComponent;
    Blockquote: typeof SvelteComponent;
}

export function getBlocks(html: string | null, blocks: BLOCKS): Entry[] {
    if (!html) {
        return [];
    }

    const elements: Entry[] = [];

    const root = parse(html);
    for (const child of root.childNodes) {
        // @ts-ignore
        const tagName = child.rawTagName;
        const element = child as unknown as HTMLElement;

        switch (tagName) {
            case "p":
                elements.push({
                    component: blocks.Paragraph,
                    props: {
                        html: element.outerHTML,
                    },
                });
                break;

            case "blockquote":
                elements.push({
                    component: blocks.Blockquote,
                    props: {
                        html: element.outerHTML,
                    },
                });
                break;

            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
                elements.push({
                    component: blocks.Heading,
                    props: {
                        html: element.outerHTML,
                    },
                });
                break;

            case "hr":
                elements.push({
                    component: blocks.Hr,
                });
                break;

            case "figure":
                // is image?
                if (element.classList.contains("kg-image-card")) {
                    const image = element.querySelector("img");
                    const src = image?.getAttribute("src");
                    if (image && src) {
                        elements.push({
                            component: blocks.Image,
                            props: {
                                src,
                                width: image.getAttribute("width"),
                                height: image.getAttribute("height"),
                                alt: image.getAttribute("alt"),
                                caption: element.querySelector("figcaption")?.innerHTML,
                            },
                        });
                    }
                    continue;
                }

                if (element.classList.contains("kg-gallery-card")) {
                    const images = [...element.querySelectorAll("img")].map(
                        (image: any) => {
                            return {
                                src: image.getAttribute("src"),
                                width: image.getAttribute("width"),
                                height: image.getAttribute("height"),
                            };
                        }
                    );

                    if (images.length) {
                        const galleryCaption = element.querySelector("figcaption");

                        elements.push({
                            component: blocks.ImageGallery,
                            props: {
                                images,
                                caption: galleryCaption?.outerHTML,
                            },
                        });
                    }

                    continue;
                }

                if (element.classList.contains("kg-embed-card")) {
                    elements.push({
                        component: blocks.Embed,
                        props: {
                            html: element.outerHTML,
                        },
                    });
                    continue;
                }

                if (element.classList.contains("kg-bookmark-card")) {
                    elements.push({
                        component: blocks.Bookmark,
                        props: {
                            html: element.outerHTML,
                        },
                    });
                    continue;
                }

                if (element.classList.contains("kg-video-card")) {
                    elements.push({
                        component: blocks.Video,
                        props: {
                            html: element.outerHTML,
                        },
                    });
                    continue;
                }

                break;

            default:
                if (element.classList?.contains("kg-button-card")) {
                    elements.push({
                        component: blocks.Button,
                        props: {
                            html: element.outerHTML,
                        },
                    });
                    continue;
                }

                if (element.classList?.contains("kg-header-card")) {
                    elements.push({
                        component: blocks.Header,
                        props: {
                            html: element.outerHTML,
                        },
                    });
                    continue;
                }

                break;
        }
    }

    return elements;
}
