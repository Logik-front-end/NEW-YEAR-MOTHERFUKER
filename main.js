document.addEventListener('DOMContentLoaded', () => {
    const snowflakeCount = 120;

    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.classList.add('snowflakes');
    document.body.appendChild(snowflakesContainer);

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflakesContainer.appendChild(snowflake);

        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
    }

    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        if (name && email && message) {
            alert('Форма успішно відправлена!');
            form.reset();
        } else {
            alert('Будь ласка, заповніть всі поля!');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-menu .link').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
