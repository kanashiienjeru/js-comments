let commentsList = []
const avatars = [ //// FIX DELETING
    'https://i.ebayimg.com/00/s/NTAwWDUwMA==/z/MTwAAOSwkQJdnNP7/$_1.JPG?set_id=8800005007',
    'https://i.ebayimg.com/00/s/ODUwWDg1MA==/z/wOUAAOSw9J9d9Pes/$_57.JPG?set_id=8800005007',
    'https://i.ebayimg.com/images/g/rF8AAOSwiA5fo-yL/s-l500.jpg',
    'https://resize.cdn.otakumode.com/full/shop/product/a61eaf3deb244edbb712e2144988af9b.jpg',
    'https://resize.cdn.otakumode.com/full/shop/product/8445d9fba5c34594b05516d8eb18893b.jpg',
    'https://i.ebayimg.com/00/s/NTAwWDUwMA==/z/2pAAAOSwOLFhbnof/$_57.JPG?set_id=8800005007',
    'https://i.warosu.org/data/jp/img/0163/13/1483237925376.jpg',
    'https://i.redd.it/dhq4ihultv741.jpg'
]

// comments counter
const sum = document.querySelector('.sum')

// form & textarea
const form = document.querySelector('form')
const textarea = document.querySelector('textarea')
const nameInput = document.querySelector('#name')

// errors
const nameError = document.querySelector('.name-error')
const commentError = document.querySelector('.comment-error')

// comments parent block
const commentsBlock = document.querySelector('.comments-block')


// auto resize textarea
textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px;overflow-y:hidden;');
textarea.addEventListener("input", function() { 
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}, false);

// send form when press 'Enter' on textarea
textarea.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        document.querySelector('#send-button').click()
    }
})

// remove error when user types
textarea.addEventListener('input', () => textarea.value.length > 0 ? commentError.classList.remove('show') : null)
nameInput.addEventListener('input', () => nameInput.value.length > 0 ? nameError.classList.remove('show') : null)

// render comments item
const render = () => {
    sum.textContent = commentsList.length // comments counter
    let id = 0
    const currentDate = new Date() 

    commentsList.map(e => {
        e.id = id++
        if (document.getElementById(`${id}`)) { 
            return
        } 

        e.likes = 0 // like counter
        
        let isFavorite = false // favorite status
        commentsBlock.insertAdjacentHTML('afterbegin', `
        <div id="${id}" class="comments-item">
            <img class="avatar" src=${avatars[Math.floor(0 + Math.random() * ((avatars.length - 1) + 1 - 0))]} />
            <div class="content">
            <p class="comment-name">${e.name}</p>
            <p class="comment-date">${(currentDate.getDate() - e.created_at.getDate()) == 1 ? `вчера в ${currentDate.getHours()}:${currentDate.getMinutes()}` : (currentDate.getDate() - e.created_at.getDate()) == 0 ? `сегодня в ${currentDate.getHours()}:${currentDate.getMinutes()}` : `когда-то в ${currentDate.getHours()}:${currentDate.getMinutes()}`}</p>
                <p class="comment-text">${e.comment}</p>
                <div class="comment-panel">
                    <div class="like-block">
                        <img style="width: 16px" class="like" src="./images/heart.svg"/>
                        <p class="counter">${e.likes}</p>
                    </div>
                    <img class="delete" src="./images/delete.svg"/>
                </div>
            </div>
            
        </div>
        `)
        document.querySelector('.like').addEventListener('click', (item) => {  // like function
            if (isFavorite) {
                e.likes--;
                document.getElementById(`${id}`).getElementsByClassName('counter')[0].textContent = e.likes
                item.srcElement.setAttribute('src', './images/heart.svg')
            } else {
                e.likes++;
                document.getElementById(`${id}`).getElementsByClassName('counter')[0].textContent = e.likes
                item.srcElement.setAttribute('src', 'https://vk.com/reaction/1-reactions-0-96?c_uniq_tag=0a64c3d34d3a1368b05716ff24f94ff51b2257a2287957423ced36a00b020cb6')
            }
            isFavorite = !isFavorite
        })

        document.querySelector('.delete').addEventListener('click', () => { // delete comment function
            document.getElementById(id).classList.add('deleting')
            setTimeout(() => {
                document.getElementById(`${id}`).remove()
                commentsList = commentsList.filter(elem => e.id !== elem.id)
                sum.textContent = commentsList.length
            }, 200)
        })
    })
}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    // validation
    form.name.value.length >= 2 ? nameError.classList.remove('show') : nameError.classList.add('show')
    console.log(form.name.value.length)
    form.commentField.value ? commentError.classList.remove('show') : commentError.classList.add('show')
    if (form.name.value == '' || form.commentField.value == '' ) return

    const name = form.name.value
    const comment = form.commentField.value
    let date = new Date(form.date.value)
    if (!form.date.value) {
        date = new Date()
      }
    commentsList.push({name, comment, created_at: date, likes: null})
    render()

    form.name.value = ''
    form.commentField.value = ''
    form.date.value = ''
})