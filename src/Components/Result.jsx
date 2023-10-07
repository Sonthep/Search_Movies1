
export default function Result(props) {
    const boxes = props.movies.map(
        (item) => {
            return <Box key={item.id} image={item.poster_path} title={item.original_title} rating={item.vote_average} releas={item.release_date}  />
        }
    )
    return (
        <div className='w-full grid md:grid-cols-4 gap-5'>
            {boxes}
        </div>
    )
}


const Box = (props) => {
    const releaseDateObj = new Date(props.releas);
    const convertedDate = releaseDateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const IMGPATH = "https://image.tmdb.org/t/p/original/";
    return (
        <div className='shadow min-h-[200px] mt-3 pb-1'>
            <img src={IMGPATH + props.image} alt={props.title} className='w-full' />
            <div className='flex justify-between px-2 items-center'>
                <span className='text-2xl'>{props.title}</span>
                <p className="text-xl text-yellow-500 font-bold">{props.rating}</p>
            </div>
            <div>
            <p className="ml-2">{convertedDate}</p>
            </div>
            
        </div>
    )
}