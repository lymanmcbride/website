import { BackgroundImage } from '../components/BackgroundImage'
import { Display, Eyebrow } from '../components/Typography'
import { siteContent } from '../content/site'

export function Home() {
  return (
    <BackgroundImage as="main" $image={siteContent.heroImage} $align="flex-end">
      <div>
        <Display>Lyman McBride</Display>
        <Eyebrow>Trombone</Eyebrow>
      </div>
    </BackgroundImage>
  )
}
