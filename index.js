// get elements
const button = document.querySelector('button')
const picker = document.querySelector('input')
const states = document.querySelector('span')

// button click event
button.addEventListener('click', () => {
    // reset file picker
    picker.value = ''
    // open file picker
    picker.click()
})

// file input event
picker.addEventListener('input', () => {
    // get file to upload
    const file = picker.files[0]
    // create form data
    const data = new FormData()
    // append file into data
    data.append('file', file)
    // create request
    const reqs = new XMLHttpRequest()
    // open request to upload
    reqs.open('POST', 'index.php', true)
    // create progress item
    const item = document.createElement('div')
    // get file size
    const size = `<size>(${(file.size / 1048576).toFixed(2)} MB)</size>`
    // set item text
    item.innerHTML = `<text>${file.name}</text> ${size}<span>PENDING</span>`
    // get progress span
    const span = item.querySelector('span')
    // append item into states
    states.appendChild(item)
    // upload progress event
    reqs.upload.addEventListener('progress', event => {
        // return if length not computable
        if (event.lengthComputable === false) { return }
        // get progress value
        const prog = (event.loaded / event.total) * 100
        // set progress on span
        span.innerHTML = prog.toFixed(2) + '%'
        // set progress bar
        item.style.boxShadow = `inset ${parseInt(prog)}vw 0px 0px 0px #FFF2`
    })
    // upload complete event
    reqs.addEventListener('loadend', () => {
        // set done on span
        span.innerHTML = 'DONE'
    })
    // send request
    reqs.send(data)
})