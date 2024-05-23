import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/NosMetiers.module.scss';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Page from "@/components/Page";

const Agence: React.FC = () => {
    // Utilisez useRouter pour obtenir l'objet router de Next.js
    const router = useRouter();

    // Utilisez useEffect pour exécuter du code lors du montage et du démontage du composant
    useEffect(() => {
        // Votre logique spécifique à cette page, par exemple : récupérer des données, effectuer des appels API, etc.
        // Cela peut être vide si cette page ne nécessite aucune logique supplémentaire lors du chargement initial
    }, []); // Le tableau vide en tant que deuxième argument signifie que ce code s'exécutera une seule fois après le montage initial

    return (
        <div className={styles.container}>
            {/* Utilisez Head pour gérer les balises meta et autres balises d'en-tête spécifiques à cette page */}
            <Head>
                <title>L agence</title>
                <meta name="description" content="Description de la page l'agence" />
            </Head>
            <Page>
                <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 w-100"><h2>L agence</h2></div>

            </Page>
        </div>
    );
};

export default Agence;
