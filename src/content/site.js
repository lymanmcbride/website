import portrait from "../assets/mcbride2019-14.jpg"
import heroPhoto from "../assets/mcbride2019-11.jpg"

// Resolves a file in public/ (e.g. "images/hero.jpg") against the deploy base path.
const asset = (path) => (path ? `${import.meta.env.BASE_URL}${path}` : "")

export const siteContent = {
  bio: ["Lyman McBride is a trombonist and educator based in Utah. He currently performs with the Orchestra at Temple Square and works as a freelance musician throughout the state.",
      "McBride’s performance experience spans orchestral, chamber, commercial, and solo engagements. He has performed with the Utah Symphony, Colorado Springs Philharmonic, and National Repertory Orchestra, and is a member of the Wasatch Trombone Quartet, with which he has appeared at the International Trombone Festival and Weber State University’s Trombone Rendezvous. His commercial work includes recording sessions, performances with the Timpanogos Big Band, and principal trombone in Andrea Bocelli’s orchestra for his Salt Lake City performance. McBride has toured Europe with the Curtis Symphony Orchestra, the Baltic States and Scandinavia with BYU Synthesis, and Brazil with the Orchestra at Temple Square. As a featured soloist, he toured Mongolia, South Korea, and Japan with the BYU Wind Symphony.",
      "McBride won the 2015 Larry Wiehe Competition and was a brass winner in both the BYU Junior and Senior Concerto Competitions. He received an honorable mention in the 2017 Frank Smith Competition and, as a member of Elm Street Brass, reached the semifinals of the 2020 Fischoff National Chamber Music Competition.",
      "As an educator, he has been faculty at Yale’s Music in Schools Initiative and Morse Summer Music Academy, where he provided individual instruction, coached chamber music, and led brass sectionals and ensemble rehearsals for middle- and high-school musicians. He has also served on the trombone faculty at BYU Summerfest, presented an invited masterclass at Snow College, and maintained a private trombone studio.",
      "McBride earned a Master of Music from the Yale School of Music and a Post-Baccalaureate Diploma from the Curtis Institute of Music, following undergraduate studies at Brigham Young University. His principal teachers include Scott Hartman, Nitzan Haroz, Matt Vaughn, Graeme Mutchler, and Will Kimball."],
  photoPath: portrait,
  // Full-page hero on Home, e.g. "images/hero.jpg" (file in public/images/)
  heroImage: heroPhoto,
  // Full-page background on About, e.g. "images/about-bg.jpg"
  aboutBackground: asset(""),
  // Full-page background on Events
  eventsBackground: asset(""),
  // Public Google Calendar that feeds the Events page
  calendarId: "cf5d99355bf9224d0cdd56672025fcdeb9a9c72e61b98d05cd0ca10b4a9c3f1e@group.calendar.google.com",
  // Full-page background on Listen
  listenBackground: asset(""),
  // Groups shown side by side on Listen. Each recording is a YouTube video { id }
  // or Spotify audio { spotifyId }, plus a title and optional description.
  // Each group may have a cta: { label, url }, and rowSpan: 2 to stay in the left column
  // while the next two groups stack in the right column.
  listenGroups: [
    {
      heading: "Yale Recital 2020",
      rowSpan: 2,
      recordings: [
        { id: "dBHu9g4bygo", title: "Creston Fantasy, Op. 42" },
        { id: "QqGWCeKjYWQ", title: "Brahms: Erinnerung, Op. 63, No. 2 and Von ewiger Liebe, Op. 43, No. 1" },
      ],
      cta: { label: "Watch the full recital", url: "https://www.youtube.com/playlist?list=PLKFyieK9hfko" },
    },
    {
      heading: "Solo Recordings",
      recordings: [
        { spotifyId: "4BNchjgZNpYleOo8JWQbEM", title: "Fantastic Polka (Arr. A. Glover for Wind Ensemble)", description: "BYU Wind Symphony" },
      ],
      cta: { label: "Listen to the full album", url: "https://open.spotify.com/album/0ym8SXqS2gXurcqDIuzqLm" },
    },
    {
      heading: "Curtis Graduation Recital 2018",
      recordings: [
        { id: "njlqKPlu660", title: "Colors" },
      ],
      cta: { label: "Watch the full recital", url: "https://www.youtube.com/playlist?list=PLVuMO1TlOAKg" },
    },
  ],
  // Albums where Lyman played as an ensemble member (not soloist), shown full-width on Listen.
  // Each album is { title, spotifyAlbumId } or { title, appleMusicPath } (path after music.apple.com/).
  ensembleAlbums: [
    { title: "Legends of Deseret", spotifyAlbumId: "2F32IX2J0X42aAOiuSKYE3" },
    { title: "Downtime: Live on Tour in the Baltic States & Scandinavia", spotifyAlbumId: "3UgDX5STroH22jWLkcZefF" },
    { title: "Timeless: Wind Band Dances & Other Concert Favorites", spotifyAlbumId: "0ym8SXqS2gXurcqDIuzqLm" },
  ],
  youtubeId: "",
}
