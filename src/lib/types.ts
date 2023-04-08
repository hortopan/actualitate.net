import { z } from "zod";
import type { PostOrPage, Nullable } from "@tryghost/content-api";

export const JSON_CONFIG = z
    .object({
        menu: z.array(
            z.object({
                href: z.string(),
                title: z.string().optional(),
                target: z.string().optional(),
                html: z.string(),
                rel: z.string().optional(),
            })
        ),
    })
    .optional();

export type JSON_CONFIG = z.infer<typeof JSON_CONFIG>;

export interface PostOrPageInternal extends PostOrPage {
    feature_image?: Nullable<string>;
    thumb_image?: Nullable<string>;
}

export type RETURN_DATA = {
    type: "page" | "post" | "category";
    data: PostOrPageInternal | PostOrPageInternal[];
    more?: PostOrPageInternal[];
    lastModified?: Date;
    path: string;
    meta: {
        title: string;
        description?: Nullable<string>;
        canonical: string;
        image?: Nullable<string>;
    };
    config?: JSON_CONFIG;
    site_config?: {
        friendly_name: string;
        friendly_description: string;
        friendly_url: string;
    }
};
