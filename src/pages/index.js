import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Layout } from "../components/Layout";
import { Seo } from "../components/seo";
import { Form } from "../components/form";
// import { StaticImage } from "gatsby-plugin-image";

export default function Home(props){
  const {data} = props;
  console.log(data);
  return (
    <>
      <Seo />
      <Layout>

        <section className="hero">
          <figure>
            <GatsbyImage image={data.hero.childImageSharp.gatsbyImageData} style={{height: "100%"}}alt="" />
            {/* <StaticImage 
            src="../images/hero.jpg"
            layout="fullWidth"
            alt=""
            placeholder="blurred"
            quality="89"
            /> */}
          </figure>
          <div className="catch">
            <h1>There is no love sincerer than<br /> the love of food.</h1>
            <p>食物を愛するよりも誠実な愛はない ― UCHIWA Creative Studio.</p>
          </div>
          <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 229.5" fill="#fff"><path d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z" opacity=".53" /><path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" /></svg>
          </div>
        </section>

        <section className="food">
          <div className="container">
            <h2 className="bar">Food <span>Essence</span></h2>

            <div className="details">
              <div className="detail">
                <figure>
                <GatsbyImage image={data.fruit.childImageSharp.gatsbyImageData} alt="" />
                  {/* <img src="/images/fruit.jpg" alt="" /> */}
                </figure>
                <h3>フルーツ</h3>
                <p>FRUIT</p>
                <p>甘くてすっぱくておいしい果実たち。<br />旬のフルーツを満喫します。</p>
              </div>

              <div className="detail">
                <figure>
                  <GatsbyImage image={data.grain.childImageSharp.gatsbyImageData} alt="" />
                </figure>
                <h3>穀物</h3>
                <p>GRAIN</p>
                <p>食事の基本となる穀物。<br />毎日の活動のエネルギー源になります。</p>
              </div>

              <div className="detail">
                <figure>
                  <GatsbyImage image={data.beverage.childImageSharp.gatsbyImageData} alt="" />
                </figure>
                <h3>飲み物</h3>
                <p>BEVERAGE</p>
                <p>リラックスするのに欠かせない飲み物。<br />お気に入りの一杯はありますか？</p>
              </div>
            </div>
          </div>
        </section>

        <section className="photo">
          <h2 className="sr-only">Photo</h2>
          <figure>
            <GatsbyImage image={data.berry.childImageSharp.gatsbyImageData} style={{height: "100%"}}alt="赤く熟したベリー" />
          </figure>
        </section>

        <section>
          <div className="container">
            <h2 className="sr-only">RECENT POSTS</h2>
            <div className="posts">
              {data.allContentfulBlogPost.edges.map(({ node }) => {
                return (
                  <article className="post" key={node.id}>
                    <Link to={`/blog/post/${node.slug}`}>
                      <figure>
                        <GatsbyImage 
                        image={node.eyecatch.gatsbyImageData} 
                        alt={node.eyecatch.description} 
                        style={{height: "100%"}}
                        />
                      </figure>
                      <h3>{node.title}</h3>

                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <Form />
        
      </Layout>
    </>
  )
};

export const query = graphql`
query {
  hero: file(relativePath: {eq: "hero.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        layout: FULL_WIDTH, 
        placeholder: BLURRED,
        quality: 89,
      )
    }
  }
  fruit: file(relativePath: {eq: "fruit.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width:320, 
        layout: CONSTRAINED,
        placeholder: BLURRED,
      )
    }
  }
  grain: file(relativePath: {eq: "grain.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width:320, 
        layout: CONSTRAINED,
        placeholder: BLURRED,
      )
    }
  }
  beverage: file(relativePath: {eq: "beverage.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width:320, 
        layout: CONSTRAINED,
        placeholder: BLURRED,
      )
    }
  }
  berry: file(relativePath: {eq: "berry.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        layout:FULL_WIDTH,
        placeholder: BLURRED,
        quality: 89,
      )
    }
  }
  allContentfulBlogPost(sort: {publishDate: DESC}, skip:0, limit:4) {
    edges {
      node {
        title
        id
        eyecatch {
            gatsbyImageData(
              width: 573, 
              layout: CONSTRAINED,
              sizes: "(min-width: 1146px) 573px, 50vw"
            )
            description
        }
        slug
      }
    }
  }
}
`