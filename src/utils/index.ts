const readFileAsImage = async (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
	let reader = new FileReader()
	reader.onload = (e: any) => {
	    let image = new Image()
	    image.src = e.target.result
	    image.onload = () => resolve(image)
	    image.onerror = reject
	}
	reader.onerror = reject
	reader.readAsDataURL(file)
    })
}

export default {
    readFileAsImage
}
