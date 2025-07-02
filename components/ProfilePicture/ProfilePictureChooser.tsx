
interface ProfilePictureChooserProps{
  url:string
  setSeed:(seed:string) => void
  small:boolean
}

export default function ProfilePictureChooser({setSeed, url, small}:ProfilePictureChooserProps) {

  const seeds = ['Aidan', 'Kingston', 'Jude', 'Christopher', 'Mackenzie', 'Jack', 'Valentina', 'Oliver', 'Destiny', 'Brian',
    'Mason', 'Easton', 'Christian', 'Liam', 'Jade', 'Katherine', 'Leah']


  function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  const handleShuffle = ()=>{
    const index = getRandomInt(seeds.length)
    const seed = seeds[index]
    setSeed(seed)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="avatar">
        <div className={`${small ? 'w-28' : 'w-48'} rounded-full`}>
          <img src={url} />
        </div>
      </div>
      <button className="btn btn-primary" type="button" onClick={handleShuffle}>Shuffle Picture</button>
    </div>
  )
  
}