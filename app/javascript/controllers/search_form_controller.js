import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-form"
export default class extends Controller {
  connect() {
    console.log('searchForm is connected')
  }

  search(e) {
    console.log(e.target.value)
  }
}
