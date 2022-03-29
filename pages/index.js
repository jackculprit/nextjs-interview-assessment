import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home(props) {

  const artworks = props.artworks.data;

  return (
    <div className={styles.container}>

        {artworks.map((artwork) => {
          return (
            <div key={artwork.id} className={styles.artworkContainer}>
              <span className={styles.artworkTitle}>{artwork.title}</span>
              {artwork.thumbnail && (
                <Image layout="responsive" height={100} width={100} className={styles.artworkImage}
                       src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}/>
              )}
            </div>
          )
        })}

    </div>
  )
}


// API Documentation:
// https://api.artic.edu/docs/

export async function getStaticProps() {
  const res = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=10')
  const artworks = await res.json()

  return {
    props: {
      artworks,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
