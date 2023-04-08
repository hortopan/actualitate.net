<div class="footer">
  <div class="logo">
    <a href="https://actualitate.net" title="Actualitate net"
      >Actualitate<span>net</span></a
    >
  </div>

  <ul>
    <li>
      <a
        href="/politica-confidentialitate"
        title="Politica cookies si de confidentialitate"
        >Politică de confidențialitate</a
      >
    </li>
    <li><a href="/contact" title="Informatii contact">Contact</a></li>
  </ul>

  <div>
    <p>Copyright © {new Date().getFullYear()}. Toate drepturile rezervate.</p>
  </div>
</div>

<style lang="scss">
  .footer {
    margin: 10px auto 0 auto;
    border-top: 1px solid #eee;
    width: calc(100% - 40px);
    background-color: #f5f5f5;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    flex-direction: column;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;

      a {
        text-decoration: none;
        color: inherit;

        padding: 5px;
        border-radius: 2px;

        color: #fff;
        background-color: #26205a;

        span {
          margin-left: 5px;
          text-transform: uppercase;
          background-color: rgb(0, 16, 243);
          padding: 5px;
          margin-right: -10px;
        }
      }
    }

    p {
      text-align: center;
      color: #111;
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin: 0 25px 0 0;
        display: block;
        a {
          text-decoration: none;
          color: #000;
          font-weight: 400;
        }
      }
    }
  }
</style>
