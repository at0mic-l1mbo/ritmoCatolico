function RedirectsOtherPages({link, mainText, secondaryText}){
    return (
        <p className="mt-4 text-sm text-yellow-400 sm:mt-0"> 
            {mainText}
            <a href={link} target="_blank" className="ml-2 text-yellow-500 underline font-bold">{secondaryText}</a>    
        </p>
    )
}

export default RedirectsOtherPages;