document.addEventListener('DOMContentLoaded', function () {
    // Menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navUl = document.querySelector('nav ul');

    menuMobile.addEventListener('click', function () {
        navUl.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navUl.classList.remove('active');
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe active ao link correspondente à seção visível
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Animação ao rolar
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.produto-item, .sobre-content, .sobre-image, .contato-info, .contato-form');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configuração inicial para animações
    window.addEventListener('load', function () {
        const elements = document.querySelectorAll('.produto-item, .sobre-content, .sobre-image, .contato-info, .contato-form');

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });

        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);

    // Validação do formulário
    const form = document.querySelector('.contato-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação simples
            const nome = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const mensagem = form.querySelector('textarea');

            if (nome.value.trim() === '') {
                alert('Por favor, insira seu nome');
                nome.focus();
                return;
            }

            if (email.value.trim() === '' || !email.value.includes('@')) {
                alert('Por favor, insira um e-mail válido');
                email.focus();
                return;
            }

            if (mensagem.value.trim() === '') {
                alert('Por favor, insira sua mensagem');
                mensagem.focus();
                return;
            }

            // Simulação de envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }
});