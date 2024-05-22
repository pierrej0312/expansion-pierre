import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import styles from '../styles/Header.module.scss';
import {NavItem} from "@/@types/navItem";
import Image from "next/image";

const Footer: React.FC = () => {

    return (
        <footer>
            <Image src="/assets/logo.svg" alt="" width={38} height={38}/>
                <p>©2022 Webalia</p>
        </footer>
    );
};

export default Footer;
