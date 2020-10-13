// Book one component
Vue.component("book-one", {
    props: ["bookoneShow"],
    template: `
        <div>
            <div>{{ bookoneShow.title }}</div>
            <div id="cover-one">&#9749;</div>
            <div>{{ bookoneShow.author }}</div>
        </div>
    `
})

let bookOne = new Vue({
    el: "#book-one",
    data: {
        bookOneInfo: [{
            title: "JavaScript&jQuery", 
            author: "Jon Duckett"
        }]
    }
})

// Book two component
Vue.component("book-two", {
    props: ["booktwoShow"],
    template: `
        <div>
            <div>{{ booktwoShow.title }}</div>
            <div id="cover-two">&#128187;</div>
            <div>{{ booktwoShow.author }}</div>
        </div>
    `
})

let bookTwo = new Vue({
    el: "#book-two",
    data: {
        bookTwoInfo: [{
            title: "Eloquent JavaScript", 
            author: "Marjin Haverbeke"
        }],

        hidden: false
    }
})