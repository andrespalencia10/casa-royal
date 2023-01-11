const URL = "http://localhost:3000/properties";

const cardsContainer = document.querySelector('.section-2-cards');
const btnCards = document.querySelector('#btn-cards');

const selectType = document.querySelector('#type');
const selectStatus = document.querySelector('#status');
const inputSearch = document.querySelector('#search');
const form = document.querySelector('#form');
let images;


//mostrar la inf del json

const createCard = (image, location, area, rooms, type, status, price, description, owner) => {
    cardsContainer.innerHTML += `
        <div class="card-container">
            <div class="tags">
                <p class="tag tag-blue">${type}</p>
                <p class="tag tag-orange">${status}</p>
            </div>
            <p class="tag tag-price">$${price}</p>
            <figure class="card-image">
                <img
                    src="${image}"
                    alt="House"
                    class="card-img"
                />
            </figure>
            <div class="card-info">
                <span>${location.city}, ${location.country}</span>
                <p class="card-direction">
                    ${description}
                </p>
                <div class="user-time">
                    <p>${owner.name}</p>
                    <p>4 months ago</p>
                </div>
                <div class="info">
                    <div class="info-size">
                        <i class="bx bx-building-house"></i>
                        <p><strong>${area}</strong></p>
                    </div>
                    <div class="info-inside">
                        <div class="info-icons info-parking">
                            <i class="bx bxs-car-garage"></i>
                            <p>${rooms.parking}</p>
                        </div>
                        <div class="info-icons info-bath">
                            <i class="bx bx-bath"></i>
                            <p>${rooms.bath}</p>
                        </div>
                        <div class="info-icons info-bed">
                            <i class="bx bx-bed"></i>
                            <p>${rooms.bed}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

const showProperties = async () => {
    let properties = await bringInfo();

    cardsContainer.innerHTML = '';

    properties.forEach(e => {
        const { image, location, area, rooms, type, status, price, description, owner } = e;
        createCard(image, location, area, rooms, type, status, price, description, owner);
    });
    images = document.querySelectorAll('.card-img')
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            let imglink = img.getAttribute('src');
            showDetail(imglink);
            location.href = "#section-3";
        })
    });
}

// mostrar la selección del json 

const showDetail = async (imgLink) => {
    let properties = await bringInfo();
    const detailContainer = document.querySelector('.section-3-detail');

    properties.forEach(e => {
        const { image, name, status, type, price, location, area, rooms } = e;

        if (imgLink === image) {
            detailContainer.innerHTML = `
                <div class="property-detail">
                    <section class="detail-image">
                        <img
                        src="${image}"
                        alt=""
                        class="img-detail"
                        />
                        <p>Photos</p>
                    </section>

                    <section class="detail-info">
                        <p>${type} ${status}</p>
                        <h3>${name}</h3>
                        <p>${location.city}, ${location.country}</p>
                        <button class="btn btn-orange">
                            From <strong>$${price}</strong> Per Month
                        </button>

                        <div class="property-info">
                            <div class="info-property">
                                <i class="bx bx-building-house"></i>
                                <div class="info-text">
                                <p><strong>${area}</strong></p>
                                </div>
                            </div>

                            <div class="info-property">
                                <i class="bx bx-bed"></i>
                                <div class="info-text">
                                    <p><strong>${rooms.bed}</strong></p>
                                    <p>Beds</p>
                                </div>
                            </div>

                            <div class="info-property">
                                <i class="bx bx-bath"></i>
                                <div class="info-text">
                                    <p><strong>${rooms.bath}</strong></p>
                                    <p>Bath</p>
                                </div>
                            </div>

                            <div class="info-property">
                                <i class="bx bxs-car-garage"></i>
                                <div class="info-text">
                                    <p><strong>${rooms.parking}</strong></p>
                                    <p>Garage</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `
        }

    });
}


const bringInfo = async () => {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

const search = async (value) => {
    try {
        let properties = await bringInfo();
        cardsContainer.innerHTML = '';
        properties.forEach(e => {
            const { name, image, location, area, rooms, type, status, price, description, owner } = e;
            for (let i = 0; i < value.length; i++) {
                const element = value[i];
                if (element === name || element === location.city || element === location.country || element === type || element === status || element === description || element === owner.name) {
                    createCard(image, location, area, rooms, type, status, price, description, owner);
                }
            }

        })

    } catch (error) {
        console.log(error);
    }
}

btnCards.addEventListener('click', () => {
    showProperties()
})

form.addEventListener('submit', e => {
    e.preventDefault();

    let type = selectType.options[selectType.selectedIndex].value;
    let status = selectStatus.options[selectStatus.selectedIndex].value;
    let input = inputSearch.value;

    let value = [];
    if (type && type !== '') {
        value.push(type)
    }
    if (status && status !== '') {
        value.push(status)
    }
    if (input && input !== '') {
        value.push(input)
    }
    //console.log(value);
    search(value)
    form.reset()
    location.href = "#properties";

})

