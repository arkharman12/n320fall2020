// Book one component
Vue.component("book-one", {
    props: ["bookoneShow"],
    template: "<div>{{ bookoneShow.title }} &#9749; : {{ bookoneShow.author }}</div>"
})

let bookOne = new Vue({
    el: "#book-one",
    data: {
        bookOneInfo: [{
            title: "JavaScript&jQuery", 
            cover: "", 
            author: "Jon Duckett"
        }]
    }
})

// Book two component
Vue.component("book-two", {
    props: ["booktwoShow"],
    template: "<div>{{ booktwoShow.title }} &#128187; : {{ booktwoShow.author }}</div>"
})

let bookTwo = new Vue({
    el: "#book-two",
    data: {
        bookTwoInfo: [{
            title: "Eloquent JavaScript", 
            cover: "", 
            author: "Marjin Haverbeke"
        }],

        isHidden: false
    }
})