import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import Link from 'next/link';


const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
              <a
                href="https://microderiv.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                microderiv.
              </a>
            </span>
          </h1>



          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        <div className={styles.grid}>
          

          <Link href="/dashboard">
  <a className={styles.card}>
    <Image
      src="/images/dashboard-preview.png"
      alt="Placeholder preview of starter"
      width={300}
      height={200}
    />
    <div className={styles.cardText}>
      <h2 className={styles.gradientText2}>Dashboard ➜</h2>
      <p>
        Deploy, configure, and manage your smart contracts from the
        dashboard.
      </p>
    </div>
  </a>
</Link>

          <Link href="/trading">
    <a className={styles.card}>
    <Image
      src="/images/templates-preview.png"
      alt="Placeholder preview of templates"
      width={300}
      height={200}
    />
    <div className={styles.cardText}>
      <h2 className={styles.gradientText3}>Templates ➜</h2>
      <p>
        Discover and clone template projects showcasing thirdweb
        features.
      </p>
    </div>
  </a>
</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
