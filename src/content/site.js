// Resolves a file in public/ (e.g. "images/hero.jpg") against the deploy base path.
const asset = (path) => (path ? `${import.meta.env.BASE_URL}${path}` : "")

export const siteContent = {
  bio: ["Lyman McBride is a trombonist and educator based in Utah. He currently performs with the Orchestra at Temple Square and works as a freelance musician throughout the state.",
      "McBride’s performance experience spans orchestral, chamber, commercial, and solo engagements. He has performed with the Utah Symphony, Colorado Springs Philharmonic, and National Repertory Orchestra, and is a member of the Wasatch Trombone Quartet, with which he has appeared at the International Trombone Festival and Weber State University’s Trombone Rendezvous. His commercial work includes recording sessions, performances with the Timpanogos Big Band, and principal trombone in Andrea Bocelli’s orchestra for his Salt Lake City performance. McBride has toured Europe with the Curtis Symphony Orchestra, the Baltic States and Scandinavia with BYU Synthesis, and Brazil with the Orchestra at Temple Square. As a featured soloist, he toured Mongolia, South Korea, and Japan with the BYU Wind Symphony.",
      "McBride won the 2015 Larry Wiehe Competition and was a brass winner in both the BYU Junior and Senior Concerto Competitions. He received an honorable mention in the 2017 Frank Smith Competition and, as a member of Elm Street Brass, reached the semifinals of the 2020 Fischoff National Chamber Music Competition.",
      "As an educator, he has been faculty at Yale’s Music in Schools Initiative and Morse Summer Music Academy, where he provided individual instruction, coached chamber music, and led brass sectionals and ensemble rehearsals for middle- and high-school musicians. He has also served on the trombone faculty at BYU Summerfest, presented an invited masterclass at Snow College, and maintained a private trombone studio.",
      "McBride earned a Master of Music from the Yale School of Music and a Post-Baccalaureate Diploma from the Curtis Institute of Music, following undergraduate studies at Brigham Young University. His principal teachers include Scott Hartman, Nitzan Haroz, Matt Vaughn, Graeme Mutchler, and Will Kimball."],
  photoPath: asset("src/assets/mcbride2019-14.jpg"),
  // Full-page hero on Home, e.g. "images/hero.jpg" (file in public/images/)
  heroImage: asset("src/assets/mcbride2019-11.jpg"),
  // Full-page background on About, e.g. "images/about-bg.jpg"
  aboutBackground: asset(""),
  // Full-page background on Events
  eventsBackground: asset(""),
  credits: [],
  recordings: [],
  youtubeId: "",
}
