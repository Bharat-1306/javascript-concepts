document.addEventListener('DOMContentLoaded' , () => {
    console.log('content loaded')
    const accordianHeader = document.querySelectorAll('.accordian-item-header');
    const accordianBody = document.querySelectorAll('.accordian-item-body');

    accordianHeader.forEach((item) =>  {
        item.addEventListener('click' , () => {
            // console.log(item.parentElement)
            // console.log(item.nextElementSibling)
            const accordianItem = item.parentElement; // we get the accordian item
            const accordianContent = accordianItem.querySelector('.accordian-item-body');
            console.log(accordianContent?.scrollHeight)
            console.log(accordianContent)
            accordianBody.forEach((content) => {
                if(content !== accordianContent) {
                    content.classList.remove('active');
                    content.style.maxHeight = '0';
                }
            })
            accordianContent.classList.toggle('active');

            if(accordianContent.classList.contains('active')) {
                accordianContent.style.maxHeight = accordianContent.scrollHeight + 'px';
            } else {
                accordianContent.style.maxHeight = '0';
            }

        })
    })
})