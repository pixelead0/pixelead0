document.addEventListener('DOMContentLoaded', () => {
    const timelineStart = new Date('2007-01');
    const timelineEnd = new Date('2025-12');
    const totalMonths = (timelineEnd.getFullYear() - timelineStart.getFullYear()) * 12
        + (timelineEnd.getMonth() - timelineStart.getMonth() + 1);

    // Primero colocamos las compañías
    document.querySelectorAll('.company').forEach((company) => {
        const startDate = company.dataset.start;
        const [year, month] = startDate.split('-');
        const itemDate = new Date(`${year}-${month}-01`);
        const diffMonths = (itemDate.getFullYear() - timelineStart.getFullYear()) * 12
            + (itemDate.getMonth() - timelineStart.getMonth());
        const position = (diffMonths / totalMonths) * 100;
        company.style.left = `${Math.min(100, Math.max(0, position))}%`;
    });
    // Primero colocamos las compañías
    document.querySelectorAll('.side-project').forEach((company) => {
        const startDate = company.dataset.start;
        const [year, month] = startDate.split('-');
        const itemDate = new Date(`${year}-${month}-01`);
        const diffMonths = (itemDate.getFullYear() - timelineStart.getFullYear()) * 12
            + (itemDate.getMonth() - timelineStart.getMonth());
        const position = (diffMonths / totalMonths) * 100;
        company.style.left = `${Math.min(100, Math.max(0, position))}%`;
    });

    // Luego agregamos los periodos y marcadores
    document.querySelectorAll('.company').forEach((company, index) => {
        if (company.dataset.end) {
            const startDate = company.dataset.start;
            const endDate = company.dataset.end;

            // Calcular posición inicial
            const [startYear, startMonth] = startDate.split('-');
            const startItemDate = new Date(`${startYear}-${startMonth}-01`);
            const startDiffMonths = (startItemDate.getFullYear() - timelineStart.getFullYear()) * 12
                + (startItemDate.getMonth() - timelineStart.getMonth());
            const startPosition = (startDiffMonths / totalMonths) * 100;

            // Calcular posición final
            const [endYear, endMonth] = endDate.split('-');
            const endItemDate = new Date(`${endYear}-${endMonth}-01`);
            const endDiffMonths = (endItemDate.getFullYear() - timelineStart.getFullYear()) * 12
                + (endItemDate.getMonth() - timelineStart.getMonth());
            const endPosition = (endDiffMonths / totalMonths) * 100;

            // Determinar si la empresa está arriba o abajo basado en su índice
            const isTop = index % 2 === 0;

            // Crear sombreado
            const shade = document.createElement('div');
            shade.className = 'period-shade';
            shade.style.left = `${startPosition}%`;
            shade.style.width = `${endPosition - startPosition}%`;
            shade.style.top = isTop ? '285px' : '222px';

            // Crear marcador de fin
            const marker = document.createElement('div');

            // Agregar elementos al timeline
            const timeline = document.querySelector('.timeline');
            timeline.appendChild(shade);
            timeline.appendChild(marker);
        }
    });

    // Configuración y posicionamiento de eventos especiales
    const events = {
        h1n1: {
            start: '2009-04',
            end: '2010-09',
            element: document.querySelector('.h1n1-marker')
        },
        covid: {
            start: '2020-03',
            end: '2023-05',
            element: document.querySelector('.covid-marker')
        },
        earthquake: {
            date: '2017-09',
            element: document.querySelector('.earthquake-marker')
        }
    };

    // Función para calcular posición
    const calculatePosition = (dateString) => {
        const [year, month] = dateString.split('-');
        const date = new Date(`${year}-${month}-01`);
        const diffMonths = (date.getFullYear() - timelineStart.getFullYear()) * 12
            + (date.getMonth() - timelineStart.getMonth());
        return (diffMonths / totalMonths) * 100;
    };

    // Posicionar eventos especiales
    Object.values(events).forEach(event => {
        if (event.date) { // Evento puntual (terremoto)
            const position = calculatePosition(event.date);
            event.element.style.left = `${position}%`;
        } else { // Eventos de período (pandemias)
            const startPos = calculatePosition(event.start);
            const endPos = calculatePosition(event.end);
            event.element.style.left = `${startPos}%`;
            event.element.style.width = `${endPos - startPos}%`;
        }
    });
});
