import {Controller} from "@hotwired/stimulus"
import {get, post} from '@rails/request.js'

// Connects to data-controller="search-form"
export default class extends Controller {
    static values = {
        current: {type: Number, default: 0},
        new: {type: Number, default: 0},
        // increasing: {type: Boolean, default: true},
        // term: {type: String, default: ''}
    }

    connect() {
        // console.log('searchForm is connected')
    }

    search(e) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.search_data(e.target.value)
            this.filter_data(e.target.value)
        }, 500)
    }

    search_data(query) {
        try {
            post(`/articles/search`, {
                body: JSON.stringify({query: query}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/vnd.turbo-stream.html',
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    filter_data(query) {
        query = query.trim()
        this.newValue = query.length;
        if (this.newValue >= this.currentValue ) {
            this.currentValue = this.newValue
            try {
                post(`/searches/create`, {
                    body: JSON.stringify({query: query}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/vnd.turbo-stream.html',
                    },
                })
            } catch (e) {
                console.log(e)
            }
        } else if (this.newValue < this.currentValue) {
            this.currentValue = this.newValue
        }
    };
}

