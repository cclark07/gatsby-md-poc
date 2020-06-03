import React from "react"
import { graphql, Link } from "gatsby"

export default function Template(props) {
  const {
    pageContext: { pages, events },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="event-container">
      <nav>
        {pages.map(page => {
          return (
            <Link key={page.path} to={page.path}>
              {page.title}
            </Link>
          )
        })}
      </nav>
      <div className="event">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="event-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {frontmatter.slug.includes("/events") && (
          <>
            <h2>Events</h2>
            <nav>
              {events.map(event => {
                return (
                  <Link key={event.path} to={event.path}>
                    {event.title}
                  </Link>
                )
              })}
            </nav>
          </>
        )}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
