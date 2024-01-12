import {Controller} from "@hotwired/stimulus"
import {post} from '@rails/request.js'

// Connects to data-controller="search-form"
export default class extends Controller {
    connect() {
        // console.log('searchForm is connected')
    }

    search(e) {
        console.log(e.target.value)
        try {
            post(`/articles/search`, {
                body: JSON.stringify({query: e.target.value}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/vnd.turbo-stream.html',
                },
            })
        } catch (e) {
            console.log(e)
        }
    }
}
