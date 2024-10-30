
// Event listener på søkeknappen
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;  // Henter søkeordet
    if (query) {
        showLoading(); // Viser loading-indikator
        fetchBooks(query);  // Kaller funksjonen som henter søkeresultatene
    }
});

// Funksjon for å vise loading-indikatoren
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = ''; // Tømmer tidligere resultater
}

// Funksjon for å hente bøker fra Open Library API
function fetchBooks(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayResults(data.docs);  // Sender søkeresultatene til displayResults-funksjonen
        hideLoading(); // Skjuler loading-indikator
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        hideLoading(); // Skjuler loading-indikator ved feil
    });
}

// Funksjon for å skjule loading-indikatoren
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Funksjon for å vise søkeresultatene i #results (article-seksjonen)
function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("Elementet med ID 'results' finnes ikke.");
        return;
    }

    resultsDiv.innerHTML = '';  // Tømmer tidligere resultater

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>Ingen bøker funnet.</p>';  // Hvis ingen bøker blir funnet
        return;
    }

    // Går gjennom søkeresultatene og viser dem i #results
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const title = book.title ? `<h3>${book.title}</h3>` : '';
        const author = book.author_name ? `<p>Forfatter: ${book.author_name.join(', ')}</p>` : '';
        const year = book.first_publish_year ? `<p>Første utgivelse: ${book.first_publish_year}</p>` : '';

        const coverId = book.cover_i
            ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}" />`
            : '<p>Ingen omslag tilgjengelig</p>';

        const isbn = book.isbn ? book.isbn[0] : null;
        const amazonLink = isbn
            ? `<a href="https://www.amazon.com/dp/${isbn}" target="_blank" class="buy-link">Kjøp på Amazon</a>`
            : '<p>Ingen Amazon-lenke tilgjengelig</p>';

        bookItem.innerHTML = `
            ${coverId}
            ${title}
            ${author}
            ${year}
            ${amazonLink}
        `;

        resultsDiv.appendChild(bookItem);
    });
}



// Slider Script with Previous and Next Buttons
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Show the first slide initially
showSlide(currentSlide);     



 // Simple Counter Script====================================
 function animateCounter(id, target) {
    let count = 0;
    let interval = setInterval(() => {
        if (count < target) {
            count++;
            document.getElementById(id).textContent = count;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

// Increment Visitor Count
function incrementVisitorCount() {
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;  // Start counting from 0 if no count is stored
    }
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    return visitorCount;
}

// Show Visitor Count
window.onload = () => {
    let visitorCount = incrementVisitorCount();
    animateCounter('visitorCount', visitorCount);
};