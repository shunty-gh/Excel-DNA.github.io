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

function hidecode(lang) {
  var element = document.getElementById(lang + "tab");
  element.classList.remove("tabs__item--active");
  element = document.getElementById(lang + "code");
  element.hidden = true;
  element.tabIndex = -1;
}

function showcode(lang) {
  var element = document.getElementById(lang + "tab");
  element.classList.add("tabs__item--active");
  element = document.getElementById(lang + "code");
  element.hidden = false;
  element.tabIndex = 0;

}
function codetabclicked(lang) {
  if (lang === "csharp") {
      showcode(lang);
      hidecode("vbnet");
      hidecode("fsharp");
  } else if (lang === "vbnet") {
     showcode(lang);
     hidecode("csharp");
     hidecode("fsharp");
  } else {
    showcode(lang);
    hidecode("csharp");
    hidecode("vbnet")
  }
}

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
          <p>The easiest way to make an Excel-DNA addin is to create a new project in Visual Studio:</p>
          <ol>
            <li>Select <b>Create a new project</b> and then select <b>Class Library</b> in either Visual Basic, C# or F#.</li>
            <li>Enter a name for the project.</li>
            <li> Under Framework, select the <b>.NET 6.0 (Long-term support)</b> option.</li>
          </ol>
          <p>Once a new project was created, do the following:</p>
          <ol> 
            <li>In the .csproj file, change the value between the <i>TargetFramework</i> tags to <b>net6.0-windows</b>.</li>
            <li>Add the following under <i>&lt;/PropertyGroup></i>:
            <pre>&lt;ItemGroup&gt;<br />
		             &nbsp;&nbsp;&nbsp;&nbsp;&lt;PackageReference Include="ExcelDna.Addin" Version="*-*"/&gt;<br />
	               &lt;/ItemGroup&gt;
            </pre></li>
            <li> Depending on the language of choice (C#, Visual Basic.NET or F#), add the following code to the class file (.cs, .vb or .fs):
              <div class="tabs-container tabList_node_modules-@docusaurus-theme-classic-lib-theme-Tabs-styles-module">
                <ul role="tablist" aria-orientation="horizontal" class="tabs">
                  <li id="csharptab" role="tab" tabindex="0" aria-selected="true" class="tabs__item tabItem_node_modules-@docusaurus-theme-classic-lib-theme-Tabs-styles-module tabs__item--active" onClick={() => codetabclicked('csharp')}>C#</li>
                  <li id="vbnettab" role="tab" tabindex="-1" aria-selected="false" class="tabs__item tabItem_node_modules-@docusaurus-theme-classic-lib-theme-Tabs-styles-module" onClick={() => codetabclicked('vbnet')}>VB.Net</li>
                  <li id="fsharptab" role="tab" tabindex="-1" aria-selected="false" class="tabs__item tabItem_node_modules-@docusaurus-theme-classic-lib-theme-Tabs-styles-module" onClick={() => codetabclicked('fsharp')}>F#</li>
                </ul>
                <div class="margin-top--md">
                  <div id="csharpcode" role="tabpanel" class="tabItem_node_modules-@docusaurus-theme-classic-lib-theme-TabItem-styles-module">
                    <div class="language-csharp codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module theme-code-block" style={{color: `rgb(57, 58, 52)`, background: `rgb(246, 247, 248)`}}>
                      <div class="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                        <pre tabindex="0" class="prism-code language-csharp codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar">
                          <code class="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                            <span class="token-line" style={{color: `rgb(57, 58, 52)`}}></span>
                            <span class="token keyword" style={{color: `rgb(0, 0, 159)`}}>C# code here</span>
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div id="vbnetcode" role="tabpanel" class="tabItem_node_modules-@docusaurus-theme-classic-lib-theme-TabItem-styles-module" hidden>
                    <div class="language-vbnet codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module theme-code-block" style={{color: `rgb(57, 58, 52)`, background: `rgb(246, 247, 248)`}}>
                      <div class="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                        <pre tabindex="0" class="prism-code language-vbnet codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar">
                          <code class="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                            <span class="token-line" style={{color: `rgb(57, 58, 52)`}}></span>
                            <span class="token keyword" style={{color: `rgb(0, 0, 159)`}}>VB code here</span>
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                   <div id="fsharpcode" role="tabpanel" class="tabItem_node_modules-@docusaurus-theme-classic-lib-theme-TabItem-styles-module" hidden>
                    <div class="language-fsharp codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module theme-code-block" style={{color: `rgb(57, 58, 52)`, background: `rgb(246, 247, 248)`}}>
                      <div class="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                        <pre tabindex="0" class="prism-code language-fsharp codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar">
                          <code class="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                            <span class="token-line" style={{color: `rgb(57, 58, 52)`}}></span>
                            <span class="token keyword" style={{color: `rgb(0, 0, 159)`}}>F# code here</span>
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>   
              </div>
            </li>
            <li>Compile, load and use your function in Excel:
            <pre>=SayHello("World!")</pre></li>
          </ol>
        </div>
        <br />
        <hr />
        <br />
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <br />
        <div>
          <h2 className="text--center">Testimonials</h2>
          <p>
            <a href="http://www.janestcapitcal.com" target="_blank" rel="noopener noreferrer">
            <img loading="lazy" class="float-image img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" src="/img/jane-street-logo.png" /></a>
            <br />
            <a href="http://www.janestcapital.com/" target="_blank" rel="noopener noreferrer">Jane Street</a> uses Excel-DNA.
          </p>
          <p>&nbsp;</p>
          <p>
            <a href="http://eqfltd.com" target="_blank" rel="noopener noreferrer">
            <img loading="lazy" class="float-image img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" src="/img/eq_logo.png" /></a>
            <br />
            "We migrated to Excel-DNA, which has simplified greatly our Excel interfacing. It is a superb product, superior to others we have used previously, and Govert is incredibly responsive and helpful in maintaining and improving it." - Alberto Cherubini, <a href="http://eqfltd.com/" target="_blank" rel="noopener noreferrer">EQ Finance</a>
          </p>
          <p>&nbsp;</p>
          <p>
            "Excel-DNA is in use in our major locations around the world and in many mission critical scenarios. Usage covers the full gamut of features from simple UDF add-ins to managing real-time trading flow, interacting with order management systems. The open source Excel-DNA project is incredibly useful to us. Thanks very much to Govert and contributors." - Paul Gresham, Hong Kong.
          </p>
          <p>&nbsp;</p>
          <p>
            <a href="http://www.calcbench.com" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" class="float-image img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" src="/img/calcbench-logo.png" /></a>
              "I have never programmed with Excel and Excel-DNA allowed me build Calcbench's Excel Add-In in two weeks." - Andrew Kittredge, <a href="http://www.calcbench.com/" target="_blank" rel="noopener noreferrer">Calcbench</a>
          </p>
          <p>&nbsp;</p>
          <p>
            <a href="http://findynamics.com" target="_blank" rel="noopener noreferrer">
            <img loading="lazy" class="float-image img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" src="/img/xbrl-analyst-logo.png" /></a>
            "Excel-DNA is incredibly versatile and stable framework for building Excel add-ins and user-defined functions. With such a pivotal element in our project, we were very concerned about committing to Excel-DNA that was developed by an enthusiast. However, we quickly learned that Govert has created an outstanding open source project; that he is keen on helping with any challenging questions and that the community is active enough to sustain a healthy evolution of Excel-DNA." - Ilya Vadeiko, <a href="http://findynamics.com/" target="_blank" rel="noopener noreferrer">FinDynamics</a>
          </p>
          <p>&nbsp;</p>
          <p>
            <a href="http://solution7.co.uk" target="_blank" rel="noopener noreferrer">
            <img loading="lazy" class="float-image img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" src="/img/s7logo.png" /></a>
            "Excel-DNA is the open source project that quietly delivers a robust and simple to use extensibility framework for Microsoft Excel. When we felt we had outgrown VBA, no longer wanted the complexity of C++ and were thoroughly fed up with VSTO, Excel-DNA seemed a great choice and we haven't been let down.
          </p>
          <p>
            In Excel-DNA, combined with his incredible understanding of Excel integration, the .Net framework and passion for wanting to help others, Govert continues to deliver a project that makes Excel-DNA a 'no brainer' choice.
          </p>
          <p>
            Thank you to Govert and to everyone involved in Excel-DNA - well done." - Simon Miles, <a href="http://solution7.co.uk/" target="_blank" rel="noopener noreferrer">Solution 7</a>
          </p>
        </div>
      </div>
    </section>
  );
}
