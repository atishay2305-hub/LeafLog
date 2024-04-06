// pages/tos.tsx
"use client";

import Head from "next/head";
import Header from "../components/Header";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from './getting-started.module.css';

export default function Start() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Getting Started</title>
          <meta name="description" content="Getting Started" />
        </Head>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Getting Started</h1>
        </div>
      <div className={styles.formWrapper}>
      <div className={styles.body}>
        <br/><br/>
        Welcome to LeafLog. This Getting Started guide can help you understand the main
        types of plants and how they are different. This information can serve as general 
        advice, or help you select what plants can suit your garden! We'll explore broad 
        categories of houseplants along with tips on how to care for them.
        <br/><br/>
        1. Succulents and Cacti:
        <br/>
        <div className={styles.indent}>
        - Lifestyle: Low-maintenance, drought-tolerant plants.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Well-draining soil mix specifically for succulents and cacti.
        <br/>
        - Light: Bright indirect light or direct sunlight for a few hours daily.
        <br/>
        - Watering: Allow the soil to dry out completely between waterings.
        <br/>
        - Temperature: Thrive in warm temperatures; protect from frost.
        <br/>
        - Potting: Use shallow pots with drainage holes.
        </div>
        </div>
        2. Mosses:
        <br/>
        <div className={styles.indent}>
        - Lifestyle: Moisture-loving plants suitable for terrariums and shady spots.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Well-draining, moisture-retentive substrate such as sphagnum moss.
        <br/>
        - Light: Indirect or low light conditions.
        <br/>
        - Watering: Keep the moss consistently moist but not waterlogged.
        <br/>
        - Humidity: High humidity levels are essential; mist regularly or enclose in a terrarium.
        </div>
        </div>
        3. Ferns
        <br/><div className={styles.indent}>
        - Lifestyle: Moisture-loving plants suitable for humid environments.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Rich, well-draining potting mix with high organic content.
        <br/>
        - Light: Indirect light or low light conditions.
        <br/>
        - Watering: Keep the soil consistently moist but not waterlogged.
        <br/>
        - Humidity: Mist the leaves regularly or place the pot on a pebble tray filled with water.
        <br/>
        - Temperature: Moderate temperatures; avoid cold drafts.
        </div>
        </div>
        4. Climbers:
        <br/><div className={styles.indent}>
        - Lifestyle: Vining plants that thrive with support or can trail gracefully.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Well-draining potting mix.
        <br/>
        - Light: Moderate to bright indirect light.
        <br/>
        - Support: Provide trellis, stakes, or hooks for climbing.
        <br/>
        - Watering: Allow the soil to dry out slightly between waterings.
        <br/>
        - Pruning: Regularly prune to control growth and encourage bushiness.
        </div> 
        </div>

        5. Herbs:
        <br/><div className={styles.indent}>
        - Lifestyle: Culinary and aromatic plants prized for their flavorful leaves and fragrant foliage.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Well-draining potting mix rich in organic matter.
        <br/>
        - Light: Bright, indirect light or direct sunlight for a few hours daily.
        <br/>
        - Watering: Keep the soil evenly moist but not waterlogged.
        <br/>
        - Harvesting: Regularly harvest leaves to encourage bushier growth.
        <br/>
        - Fertilization: Apply a balanced fertilizer sparingly during the growing season.
        </div> 
        </div>

        6. Flowering Plants:
        <br/><div className={styles.indent}>
        - Lifestyle: Plants that produce vibrant blooms, adding color and fragrance to indoor spaces.
         Can be annual, biennial, or perennial.
        <br/>
        - Care Tips:
        <div className={styles.indent}>
        - Soil: Well-draining potting mix suitable for flowering plants.
        <br/>
        - Light: Varied light requirements depending on the species; provide adequate light for blooming.
        <br/>
        - Watering: Follow specific watering needs; avoid overwatering or underwatering.
        <br/>
        - Fertilization: Apply a balanced fertilizer during the growing season to promote flowering.
        <br/>
        - Deadheading: Remove spent flowers to encourage continuous blooming.
        </div> 
        </div>

        Here's a brief explanation of annuals, biennials, and perennials:
        <br/>
        <div className={styles.indent}>
        1. Annuals:
        <br/><div className={styles.indent}>
        - Annual plants complete their life cycle within one growing season, typically from seed to 
        flowering to seed production, all in a single year.
        <br/>
        - Examples include petunias, marigolds, and zinnias.
        <br/>
        - Annuals are often prized for their vibrant blooms and are commonly used for seasonal color 
        in gardens, containers, and borders.
        <br/>
        - They typically die off after flowering and setting seeds, so they need to be replanted each year.
        </div>
        
        2. Biennials:
        <br/><div className={styles.indent}>
        - Biennial plants complete their life cycle over two growing seasons.
        <br/>
        - During the first year, biennials usually produce foliage and establish their root systems.
        <br/>
        - Flowering and seed production typically occur during the second year.
        <br/>
        - Examples include foxgloves, hollyhocks, and some types of carrots.
        <br/>
        - Biennials often self-seed, meaning they drop seeds that germinate and grow into new plants
         in subsequent years.
        </div>
       
        3. Perennials:
        <br/><div className={styles.indent}>
        - Perennial plants live for multiple growing seasons, often for many years.
        <br/>
        - They typically die back to the ground in colder climates during the winter and regrow from 
        their roots in the spring.
        <br/>
        - Perennials may flower year after year, with some species having specific bloom periods.
        <br/>
        - Examples include hostas, daylilies, and peonies.
        <br/>
        - Perennials offer long-lasting beauty and can provide structure and stability to garden landscapes.
        <br/>
        - They may require periodic dividing or maintenance to keep them healthy and prevent overcrowding.
        </div>
        </div>
        With a diverse array of houseplants available, there's something for every level of gardening expertise 
        and every corner of your home. By understanding the broad categories of houseplants and their care requirements, 
        you can cultivate a thriving indoor garden that brings joy and vitality to your living space. Remember to 
        observe your plants regularly and tailor care routines to meet their individual needs. 
        <div className={styles.description}>Happy planting!</div>
      </div>
      </div>
      </div>
    </>
  );
}