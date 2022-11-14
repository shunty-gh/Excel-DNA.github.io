import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Powered by .NET',
    Svg: require('@site/static/img/placeholder.svg').default,
    description: (
      <>
        Excel-DNA is backed by powerful development tools (Visual Studio) and is accessible to many libraries. 
        Integration with .NET opens new possibilties such as multi-threading, real-time data / streaming functions, and asynchronous functions.
      </>
    ),
  },
  {
    title: 'Easy Distribution',
    Svg: require('@site/static/img/placeholder.svg').default,
    description: (
      <>
        Excel-DNA can create a single self-contained add-in (.xll) that can be easily distributed as no additional installation or registration is required.
      </>
    ),
  },
  {
    title: 'Free and Open Source',
    Svg: require('@site/static/img/placeholder.svg').default,
    description: (
      <>
        The Excel-DNA Runtime is free for all use, and distributed under a permissive open-source license that also allows commercial use.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center"> 
      <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="intro-content">
            <h2 className="text--center">Getting Started</h2>
            <p>Stuff will be written here.</p>
        </div>
        <br />
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
