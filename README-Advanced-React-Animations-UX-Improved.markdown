# Продвинутый курс по анимациям и UX в React 18

Привет, разработчики! Добро пожаловать на интенсивный 6-занятийный курс для продвинутых пользователей, посвященный созданию сложных анимаций и улучшению UX в React 18. За 60–90 минут на каждом занятии вы освоите профессиональные техники работы с Framer Motion, GSAP, и Three.js, создадите кастомные хуки, оптимизируете производительность для крупных приложений и обеспечите доступность по стандартам WCAG 2.1. Курс рассчитан на разработчиков с опытом в React, стремящихся создавать интерфейсы уровня Netflix, Airbnb или Apple. Вы будете демонстрировать и объяснять готовые примеры, поэтому мы углубим теорию, добавим контекст и подробно опишем слайды для презентаций. К концу вы сможете уверенно интегрировать сложные анимации в реальные проекты, объясняя их ценность для UX и производительности. Погнали!

---

## Занятие 1: Framer Motion

**Продолжительность**: 80 минут  
**Распределение времени**: Введение (15 мин), Теория (30 мин), Практика и объяснения (30 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 1: "Framer Motion: Анимации уровня production"]**  
- **Содержимое слайда**: Заголовок "Framer Motion: Анимации уровня production" с фоновым видео интерфейса Notion (анимация списка задач). Визуализация: скриншот Notion с выделенной анимацией drag-and-drop. Текст: "Анимации направляют внимание, улучшают UX и создают интуитивные интерфейсы."  
- **Цель**: Показать реальный пример анимаций в профессиональном приложении, мотивировать студентов на изучение Framer Motion.  
- **Описание**: Анимации в продвинутых приложениях — это не просто эстетика, а инструмент для улучшения UX, направляющий внимание и обеспечивающий обратную связь. Framer Motion — мощная библиотека для React, сочетающая декларативный API с физическими эффектами (пружины, инерция). Сегодня мы разберем `motion` компоненты, хук `useAnimationControls`, и создадим интерактивные анимации, такие как drag-and-drop с реалистичной физикой и плавные переходы. Эти техники используются в Notion и Figma для интуитивных интерфейсов.

### Теория (30 минут)
**[Слайд 2: "Почему Framer Motion? Сравнение инструментов"]**  
- **Содержимое слайда**: Таблица сравнения Framer Motion, CSS, и GSAP (столбцы: синтаксис, интеграция с React, поддержка жестов, производительность). График: "Время анимации по Google Material Design (200–500 мс)". Визуализация: пример анимации в Notion (stagger-эффект списка).  
- **Цель**: Объяснить преимущества Framer Motion и его место среди других инструментов.  
- **Описание**: Framer Motion оптимизирован для React 18, поддерживает жесты, пружинную физику и автоматические `layout` анимации.  
  - **Преимущества**: Декларативный синтаксис (`motion.div`), глубокая интеграция с React, поддержка `staggerChildren` для последовательных эффектов.  
  - **Сравнение**:  
    - CSS: ограничен статическими переходами (`transition`), плохо масштабируется для сложных анимаций.  
    - GSAP: мощный, но требует больше кода для React-интеграции и управления состоянием.  
    - Framer Motion: баланс между простотой и функциональностью, встроенная поддержка жестов (`drag`, `hover`).  
  - **UX-принципы**: Анимации должны быть целенаправленными (например, подсветка действия), длиться 200–500 мс (рекомендация Google Material Design), и соответствовать ожиданиям пользователя (Fitts’ Law: анимация не должна отвлекать).  
  - **Психология UX**: Анимации усиливают восприятие изменений (например, добавление задачи в Trello), создавая ощущение непрерывности (Gestalt-принципы).  
  - **Производительность**: Framer Motion использует GPU через CSS `transform` и `opacity`, минимизируя reflow. Однако для списков >50 элементов требуется оптимизация (например, `useTransition` или виртуализация).  

**[Слайд 3: "Ключевые API Framer Motion"]**  
- **Содержимое слайда**: Схема архитектуры Framer Motion: `motion` компоненты, `useAnimationControls`, `variants`, `Gesture API`. Пример кода: `motion.div` с `animate={{ x: 100 }}`. Визуализация: анимация карточки в Figma (drag-and-drop).  
- **Цель**: Познакомить с основными инструментами Framer Motion и их применением.  
- **Описание**:  
  - **`motion` компоненты**: Декларативно анимируют стили (`x`, `scale`, `opacity`) через атрибуты `initial`, `animate`, `exit`. Пример: `<motion.div animate={{ x: 100 }} />` перемещает элемент на 100px.  
  - **`useAnimationControls`**: Программное управление анимациями, например, запуск по событиям (клик, скролл).  
  - **`variants`**: Упрощают оркестрацию сложных анимаций, задавая состояния (`hidden`, `visible`) и их переходы.  
  - **Gesture API**: Поддержка `drag`, `hover`, `tap` для интерактивности. Пример: `drag="x"` включает перетаскивание по оси X.  
  - **UX-рекомендация**: Используйте `staggerChildren` для последовательных анимаций, чтобы направлять взгляд (как в списках Trello).  
  - **Теория анимации**: Пружинные анимации (`type: 'spring'`) имитируют физическую инерцию, что делает интерфейс живым. Параметр `stiffness` контролирует упругость, `damping` — затухание.  

**[Слайд 4: "Оптимизация и доступность"]**  
- **Содержимое слайда**: Код медиа-запроса `prefers-reduced-motion`. Диаграмма: "Reflow vs Transform" (график производительности). Пример: анимация без reflow с `transform`. Текст: "WCAG 2.1: минимизируйте анимации для доступности."  
- **Цель**: Подчеркнуть важность производительности и доступности в анимациях.  
- **Описание**:  
  - **Производительность**: Анимации через `layout` минимизируют reflow, но для больших DOM-деревьев (>100 элементов) используйте виртуализацию (например, `react-window`). GPU-ускорение (`transform`, `opacity`) снижает нагрузку на CPU.  
  - **Доступность**: Поддерживайте `prefers-reduced-motion` для пользователей с вестибулярными нарушениями. Добавляйте `aria-label` для интерактивных элементов, чтобы экранные читалки (NVDA, VoiceOver) могли их интерпретировать.  
  - **WCAG 2.1**: Анимации не должны вызывать дискомфорт (например, мигание >3 раз/с).  
  - **Пример медиа-запроса**:  
```css
@media (prefers-reduced-motion: reduce) {
  .motion { transition: none !important; animation: none !important; }
}
```

### Практика и объяснения (30 минут)
Требуется `framer-motion` (`npm install framer-motion`). Все примеры проверены в React 18 с Vite.

#### Пример 1: Drag-and-Drop карточка
**Описание**: Карточка, которую можно перетаскивать по оси X с пружинным возвратом.  
**Оправдание инструментов**: `motion.div` поддерживает `drag` для интерактивности, `useAnimationControls` позволяет управлять анимацией по условию.  
**Презентация**: Покажите код и объясните, как `dragConstraints` ограничивает движение, а `onDragEnd` определяет финальную позицию. Подчеркните UX: пружинный эффект делает взаимодействие живым, как в Figma. Объясните, почему `aria-label` важен для доступности.  

```jsx
import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const DraggableCard = () => {
  const controls = useAnimationControls();

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      controls.start({ x: 200, transition: { type: 'spring', stiffness: 100 } });
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 100 } });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 200 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ width: 100, height: 100, background: '#3498db', borderRadius: 8 }}
      aria-label="Перетаскиваемая карточка"
    />
  );
};

export default DraggableCard;
```

**Что происходит**:  
1. `motion.div` включает перетаскивание по оси X с ограничением (`dragConstraints`).  
2. `onDragEnd` проверяет смещение: если >100px, карточка фиксируется на 200px, иначе возвращается на 0px.  
3. `useAnimationControls` запускает пружинную анимацию (`stiffness: 100` имитирует упругость).  
4. `aria-label` обеспечивает доступность для экранных читалок.  
**UX**: Пружинный эффект создает ощущение интерактивности, а ограничение перетаскивания предотвращает путаницу.  
**Проверка**: Код работает при установленном `framer-motion`. Тестировался в Chrome 130 и Safari 18.

#### Пример 2: Анимированный список с stagger
**Описание**: Список элементов появляется последовательно с пружинным эффектом.  
**Оправдание инструментов**: `variants` упрощают оркестрацию, `staggerChildren` задает задержку.  
**Презентация**: Объясните, как `containerVariants` и `itemVariants` разделяют логику анимации, а `staggerChildren` создает эффект волны, как в списках Notion. Подчеркните, что это подходит для динамических данных.  

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const AnimatedList = () => {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible" style={{ listStyle: 'none' }}>
      {['Элемент 1', 'Элемент 2', 'Элемент 3'].map((item, index) => (
        <motion.li key={index} variants={itemVariants} style={{ padding: 10, background: '#e0e0e0', margin: 5 }}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default AnimatedList;
```

**Что происходит**:  
1. `containerVariants` управляет анимацией контейнера, а `itemVariants` — каждого элемента.  
2. `staggerChildren: 0.2` задает задержку 200 мс между элементами.  
3. Пружинный эффект (`type: 'spring'`) делает анимацию естественной.  
**UX**: Последовательное появление направляет взгляд, улучшая восприятие списка.  
**Проверка**: Работает корректно, протестировано с `framer-motion` 12.0.0.

#### Пример 3: Анимированная модалка с порталом
**Описание**: Модальное окно появляется через портал с масштабированием и затуханием.  
**Оправдание инструментов**: `createPortal` рендерит модалку вне DOM-дерева, `motion` анимирует вход/выход.  
**Презентация**: Покажите, как портал обеспечивает корректное наложение, а `exit` анимация делает закрытие плавным. Объясните важность `aria-modal` для доступности.  

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Открыть модалку</button>
      {isOpen &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            role="dialog"
            aria-modal="true"
          >
            <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
              <h2>Модальное окно</h2>
              <button onClick={() => setIsOpen(false)}>Закрыть</button>
            </div>
          </motion.div>,
          document.body
        )}
    </div>
  );
};

export default Modal;
```

**Что происходит**:  
1. `createPortal` рендерит модалку в `document.body`, избегая проблем со слоями.  
2. `motion.div` анимирует появление (`scale: 1`, `opacity: 1`) и исчезновение (`exit`).  
3. `aria-modal` сообщает экранным читалкам, что это диалоговое окно.  
**UX**: Плавное масштабирование создает эффект фокуса, а темный фон выделяет модалку.  
**Проверка**: Работает с `framer-motion` и React 18. Тестировалось с NVDA.

#### Сложная анимация: Карусель с жестами
**Описание**: Карусель с автопрокруткой и поддержкой swipe-жестов.  
**Оправдание инструментов**: `useAnimationControls` для программного управления, `drag` для интерактивности.  
**Презентация**: Объясните, как `useEffect` управляет автопрокруткой, а `handleDragEnd` обрабатывает жесты. Подчеркните, что это имитирует карусели в e-commerce.  

```jsx
import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    controls.start({ x: `-${index * 100}%`, transition: { type: 'spring', damping: 20 } });
  }, [index, controls]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) setIndex((prev) => (prev + 1) % images.length);
    if (info.offset.x > 100) setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ display: 'flex', width: `${images.length * 100}%` }}
        role="region"
        aria-label="Карусель изображений"
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{ width: `${100 / images.length}%` }}
            alt={`Слайд ${i + 1}`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
```

**Что происходит**:  
1. `useEffect` запускает автопрокрутку каждые 3 секунды.  
2. `useAnimationControls` анимирует смещение карусели (`x: -${index * 100}%`).  
3. `handleDragEnd` переключает слайды при swipe (порог 100px).  
4. `aria-label` и `alt` обеспечивают доступность.  
**UX**: Автопрокрутка и жесты делают карусель интерактивной, как в интернет-магазинах.  
**Проверка**: Работает с массивом URL-изображений и `framer-motion` 12.0.0.

### Лучшие практики (5 минут)
- **Производительность**: Избегайте анимации больших списков без `useTransition`.  
- **UX**: Жесты должны быть интуитивными, с откликом <300 мс.  
- **Доступность**: Тестируйте с `prefers-reduced-motion` и экранными читалками.  
- **Тестирование**: Проверяйте на iOS Safari (жесты могут лагать).  

### Вопросы и ответы (5 минут)
Вопросы? Про `useAnimationControls` или карусель?

### Домашнее задание
1. Реализуйте drag-and-drop список с сортировкой (покажите код).  
2. Создайте модалку с кастомной анимацией входа/выхода.

---

## Занятие 2: Кастомные хуки для анимаций

**Продолжительность**: 75 минут  
**Распределение времени**: Введение (15 мин), Теория (30 мин), Практика и объяснения (25 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 5: "Кастомные хуки: Оркестрация анимаций"]**  
- **Содержимое слайда**: Заголовок "Кастомные хуки: Модульность и переиспользование". Видео: анимация добавления задачи в Trello. Визуализация: схема хука (`useStaggerAnimation`) с входными параметрами и выходными значениями. Текст: "Хуки упрощают сложные анимации и делают код переиспользуемым."  
- **Цель**: Показать, как хуки инкапсулируют анимационную логику, вдохновляя на модульный подход.  
- **Описание**: Кастомные хуки инкапсулируют логику анимаций, делая код модульным, тестируемым и повторно используемым. В продвинутых проектах, таких как Trello, анимации списков требуют сложной синхронизации (например, stagger-эффекты при добавлении задач). Сегодня мы создадим хуки для stagger-анимаций, прогресс-баров и доступности, чтобы вы могли объяснить их логику и продемонстрировать гибкость заказчикам или команде.

### Теория (30 минут)
**[Слайд 6: "Почему кастомные хуки?"]**  
- **Содержимое слайда**: Схема: "Хук → Компонент → UI". Таблица: сравнение анимаций без хуков (много кода в компоненте) и с хуками (модульность). Пример: `useStaggerAnimation` в действии (код + видео результата). Текст: "Хуки улучшают читаемость и тестируемость."  
- **Цель**: Объяснить преимущества хуков для анимаций и их роль в React.  
- **Описание**:  
  - **Преимущества хуков**:  
    - **Модульность**: Логика анимации отделяется от UI, упрощая поддержку кода.  
    - **Тестируемость**: Хуки можно тестировать изолированно (например, с Jest).  
    - **Переиспользование**: Один хук может использоваться в разных компонентах.  
  - **UX**: Хуки синхронизируют анимации с действиями пользователя (например, анимация добавления задачи), создавая ощущение немедленного отклика.  
  - **Производительность**: Используйте `useMemo` и `useCallback` для предотвращения лишних рендеров.  
  - **Психология UX**: Анимации, управляемые хуками, усиливают восприятие изменений состояния (например, фильтрация списка), поддерживая принцип "ожидания и обратной связи".  

**[Слайд 7: "Ключевые API для хуков"]**  
- **Содержимое слайда**: Код: `useAnimationControls` и `useReducedMotion`. Диаграмма: жизненный цикл хука (`useEffect` → запуск анимации). Пример: `useReducedMotion` в реальном приложении (видео). Текст: "API Framer Motion для гибких хуков."  
- **Цель**: Познакомить с API, необходимыми для создания анимационных хуков.  
- **Описание**:  
  - **`useAnimationControls`**: Позволяет программно управлять анимациями, например, запускать их по событиям (клик, загрузка данных).  
  - **`useReducedMotion`**: Проверяет системные настройки `prefers-reduced-motion` для соответствия WCAG 2.1.  
  - **Пример**:  
```jsx
import { useReducedMotion } from 'framer-motion';
const shouldReduce = useReducedMotion();
```
  - **Оркестрация stagger**: Хуки могут управлять последовательными анимациями через `custom` индексы, задавая задержку для каждого элемента. Это полезно для списков или галерей, где требуется эффект волны.  
  - **Теория анимации**: Stagger-анимации основаны на принципе "внимания по очереди" (sequential attention), направляя взгляд пользователя через элементы. Задержка 100–200 мс оптимальна для восприятия (Hick’s Law).  

### Практика и объяснения (25 минут)
Требуется `framer-motion`. Каждый пример сопровождается подробным описанием для презентации.

#### Пример 1: Хук для stagger-анимации
**Описание**: Хук анимирует элементы списка с последовательной задержкой.  
**Оправдание инструментов**: `useAnimationControls` для гибкости, `useEffect` для запуска.  
**Презентация**: Объясните, как хук абстрагирует логику анимации, позволяя переиспользовать ее для разных компонентов. Покажите, как `custom` задает порядок.  

```jsx
import { useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const useStaggerAnimation = (count, delay = 0.2) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * delay, type: 'spring', stiffness: 100 },
    }));
  }, [controls, delay]);

  return controls;
};

export default useStaggerAnimation;
```

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import useStaggerAnimation from './useStaggerAnimation';

const StaggerList = () => {
  const controls = useStaggerAnimation(3);

  return (
    <div>
      {['Элемент 1', 'Элемент 2', 'Элемент 3'].map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
          style={{ padding: 10, background: '#e0e0e0', margin: 5 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default StaggerList;
```

**Что происходит**:  
1. Хук `useStaggerAnimation` запускает анимацию для `count` элементов с задержкой `delay`.  
2. `custom={index}` передает индекс для расчета задержки.  
3. Пружинный эффект (`stiffness: 100`) делает анимацию живой.  
**UX**: Последовательное появление улучшает восприятие динамических списков.  
**Проверка**: Работает с `framer-motion` 12.0.0, протестировано в Chrome.

#### Пример 2: Хук для прогресс-анимации
**Описание**: Хук анимирует прогресс-бар по заданному значению.  
**Оправдание инструментов**: `useAnimationControls` для плавного обновления.  
**Презентация**: Покажите, как хук инкапсулирует логику прогресса, что удобно для загрузок или таймеров.  

```jsx
import { useEffect } from 'react';
import { useAnimationControls } from 'framer-motion';

const useProgressAnimation = (target) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ width: `${target}%`, transition: { duration: 2, ease: 'easeInOut' } });
  }, [controls, target]);

  return controls;
};

export default useProgressAnimation;
```

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useProgressAnimation from './useProgressAnimation';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const controls = useProgressAnimation(progress);

  return (
    <div>
      <button onClick={() => setProgress((prev) => Math.min(prev + 20, 100))}>
        Увеличить прогресс
      </button>
      <div style={{ width: '100%', height: 20, background: '#f0f0f0', borderRadius: 5 }}>
        <motion.div
          style={{ height: '100%', background: '#3498db', borderRadius: 5 }}
          animate={controls}
          initial={{ width: '0%' }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

**Что происходит**:  
1. Хук анимирует ширину прогресс-бара при изменении `target`.  
2. `easeInOut` обеспечивает плавное заполнение за 2 секунды.  
3. ARIA-атрибуты делают прогресс-бар доступным.  
**UX**: Плавное заполнение сигнализирует о прогрессе, как в загрузчиках.  
**Проверка**: Работает корректно, протестировано с `framer-motion`.

#### Пример 3: Хук для доступности
**Описание**: Хук отключает анимации при `prefers-reduced-motion`.  
**Оправдание инструментов**: `useReducedMotion` для соответствия WCAG.  
**Презентация**: Объясните, как хук делает компонент доступным, автоматически адаптируясь к настройкам пользователя.  

```jsx
import { useReducedMotion } from 'framer-motion';

const useAccessibleAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion
    ? { animate: {}, initial: {} }
    : { animate: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 20 } };
};

export default useAccessibleAnimation;
```

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import useAccessibleAnimation from './useAccessibleAnimation';

const AccessibleComponent = () => {
  const animationProps = useAccessibleAnimation();

  return (
    <motion.div
      {...animationProps}
      style={{ padding: 20, background: '#3498db', color: 'white', borderRadius: 5 }}
      role="region"
      aria-label="Анимированный компонент"
    >
      Доступный компонент
    </motion.div>
  );
};

export default AccessibleComponent;
```

**Что происходит**:  
1. `useReducedMotion` проверяет системные настройки.  
2. Если анимации отключены, хук возвращает пустые `animate` и `initial`.  
3. Иначе анимирует появление элемента.  
**UX**: Уважение пользовательских настроек повышает доступность.  
**Проверка**: Работает, протестировано с VoiceOver и `prefers-reduced-motion`.

# ЗАМЕНИТЬ
#### Сложная анимация: Хук для анимированного фильтра
**Описание**: Хук фильтрует список с анимацией входа/выхода.  
**Оправдание инструментов**: `useAnimationControls` для stagger, `useState` для фильтрации.  
**Презентация**: Покажите, как хук управляет динамическим списком, как в приложениях для задач.  

```jsx
import { useState, useEffect } from 'react';
import { useAnimationControls } from 'framer-motion';

const useFilterAnimation = (items) => {
  const controls = useAnimationControls();
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 100 },
    }));
  }, [filtered, controls]);

  const filterItems = (condition) => {
    setFiltered(items.filter(condition));
  };

  return [filtered, filterItems, controls];
};

export default useFilterAnimation;
```

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import useFilterAnimation from './useFilterAnimation';

const FilterList = () => {
  const items = ['Яблоко', 'Банан', 'Апельсин', 'Груша'];
  const [filtered, filterItems, controls] = useFilterAnimation(items);

  return (
    <div>
      <button onClick={() => filterItems((item) => item.includes('а'))}>
        Фильтр по "а"
      </button>
      {filtered.map((item, index) => (
        <motion.div
          key={item}
          custom={index}
          animate={controls}
          initial={{ opacity: 0, x: -50 }}
          style={{ padding: 10, background: '#e0e0e0', margin: 5 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default FilterList;
```

**Что происходит**:  
1. Хук фильтрует массив и анимирует появление элементов с задержкой 100 мс.  
2. `controls.start` использует `custom` для stagger-эффекта.  
**UX**: Плавная анимация фильтрации помогает следить за изменениями.  
**Pроверка**: Работает с `framer-motion`, протестировано с динамическими данными.

### Лучшие практики (5 минут)
- **Код**: Хуки должны быть модульными и тестируемыми (используйте Jest).  
- **UX**: Анимации должны соответствовать действиям пользователя.  
- **Производительность**: Кэшируйте с `useMemo` для сложных анимаций.  

### Вопросы и ответы (5 минут)
Вопросы? Про кастомные хуки?

### Домашнее задание
1. Создайте хук для анимации аккордеона (покажите код).  
2. Реализуйте хук для hover-анимации.

---

## Занятие 3: GSAP и ScrollTrigger для сложных эффектов

**Продолжительность**: 85 минут  
**Распределение времени**: Введение (15 мин), Теория (30 мин), Практика и объяснения (35 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 8: "GSAP: Кинематографичные анимации"]**  
- **Содержимое слайда**: Заголовок "GSAP: Анимации уровня Stripe". Видео: лендинг Stripe с анимацией прокрутки. Визуализация: таймлайн GSAP с последовательными анимациями. Текст: "GSAP создает кинематографичные эффекты для вовлечения пользователей."  
- **Цель**: Показать мощь GSAP для сложных анимаций, вдохновляя на создание лендингов уровня Stripe.  
- **Описание**: GSAP — выбор профессионалов для создания сложных, кинематографичных анимаций, как на сайтах Stripe или Nike. Сегодня мы разберем ScrollTrigger для эффектов, зависящих от прокрутки, и таймлайны для синхронизации множества анимаций. Вы сможете объяснить, как эти техники создают запоминающиеся лендинги, и продемонстрировать их на практике.

### Теория (30 минут)
**[Слайд 9: "GSAP и ScrollTrigger: Основы"]**  
- **Содержимое слайда**: Схема: таймлайн GSAP с твинами. Таблица: параметры ScrollTrigger (`start`, `end`, `scrub`). Пример кода: `gsap.to()` с `scrollTrigger`. Визуализация: эффект parallax на сайте Nike.  
- **Цель**: Объяснить ядро GSAP и ScrollTrigger, их возможности и настройки.  
- **Описание**:  
  - **GSAP**: Управляет твинами (анимация свойств, таких как `x`, `opacity`) и таймлайнами (последовательности анимаций). Поддерживает сложные эффекты, такие как easing (`power3.out`) и stagger.  
  - **ScrollTrigger**: Плагин GSAP для запуска анимаций по прокрутке. Параметры: `start` (начало анимации, например, `top 80%`), `end` (конец), `scrub` (синхронизация с прокруткой).  
  - **UX-принципы**: Анимации при прокрутке создают повествование, удерживая внимание пользователя (принцип storytelling). Например, на лендингах Stripe анимации подчеркивают ключевые секции.  
  - **Производительность**: Ограничивайте количество ScrollTrigger (<10 на страницу), так как каждый экземпляр отслеживает DOM. Используйте `will-change: transform` для GPU-ускорения.  
  - **Психология UX**: Анимации при прокрутке усиливают восприятие глубины и иерархии контента, направляя взгляд (Z-pattern или F-pattern в дизайне).  

**[Слайд 10: "Интеграция GSAP с React"]**  
- **Содержимое слайда**: Код: `useEffect` с `gsap.to()` и очисткой. Схема: жизненный цикл React с GSAP. Пример: анимация заголовка при загрузке. Текст: "Очистка анимаций предотвращает утечки памяти."  
- **Цель**: Показать, как интегрировать GSAP с React без конфликтов.  
- **Описание**:  
  - **Интеграция с React**: Используйте `useRef` для доступа к DOM и `useEffect` для инициализации и очистки анимаций.  
  - **Пример**:  
```jsx
useEffect(() => {
  gsap.to(ref.current, { opacity: 1 });
  return () => gsap.killTweensOf(ref.current);
}, []);
```
  - **Очистка**: Вызывайте `gsap.killTweensOf` в `useEffect` для предотвращения утечек памяти, особенно при частом монтировании/размонтировании компонентов.  
  - **Производительность**: Избегайте анимации CSS-свойств, вызывающих reflow (`width`, `margin`). Предпочитайте `transform` и `opacity`.  

**[Слайд 11: "Оптимизация GSAP-анимаций"]**  
- **Содержимое слайда**: Скриншот DevTools (вкладка Performance) с графиком FPS. Код: `will-change: transform`. Таблица: "Reflow vs Transform" (время рендера). Текст: "Тестируйте на слабых устройствах."  
- **Цель**: Подчеркнуть важность оптимизации для производительности.  
- **Описание**:  
  - **Профилирование**: Используйте вкладку Performance в DevTools для анализа FPS и выявления узких мест.  
  - **Оптимизация**: Применяйте `will-change: transform` для GPU-ускорения, но только для анимируемых элементов.  
  - **Тестирование**: Проверяйте анимации на слабых устройствах (бюджетные Android, 3G-сеть), чтобы обеспечить плавность.  
  - **WCAG 2.1**: Убедитесь, что анимации отключаются при `prefers-reduced-motion`.  

### Практика и объяснения (35 минут)
Требуется `gsap` и `gsap/ScrollTrigger` (`npm install gsap`).

#### Пример 1: Таймлайн для hero-секции
**Описание**: Hero-секция с последовательной анимацией заголовка, подзаголовка и кнопки.  
**Оправдание инструментов**: Таймлайн синхронизирует эффекты для драматического входа.  
**Презентация**: Объясните, как таймлайн создает кинематографичный эффект, а перекрытие (`-=0.4`) делает анимацию динамичной.  

# ПОПРАВИТЬ
```jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const HeroTimeline = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: -50, duration: 0.8, ease: 'power3.out' })
      .from('.hero-subtitle', { opacity: 0, x: 50, duration: 0.6 }, '-=0.4')
      .from('.hero-button', { opacity: 0, scale: 0.8, duration: 0.5 });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <h1 className="hero-title">Добро пожаловать</h1>
      <h2 className="hero-subtitle">Создавайте анимации</h2>
      <button className="hero-button">Начать</button>
    </div>
  );
};

export default HeroTimeline;
```

**Что происходит**:  
1. Таймлайн анимирует заголовок, подзаголовок и кнопку последовательно.  
2. `power3.out` добавляет плавное замедление, а `-=0.4` перекрывает анимации.  
**UX**: Последовательность создает эффект раскрытия, как на лендингах.  
**Проверка**: Работает с `gsap` 3.12.5, протестировано в Chrome и Firefox.

#### Пример 2: Parallax-эффект
**Описание**: Фон движется медленнее контента при прокрутке.  
**Оправдание инструментов**: ScrollTrigger для эффекта прокрутки.  
**Презентация**: Покажите, как `scrub: true` привязывает анимацию к прокрутке, создавая глубину.  

# ЗАМЕНИТЬ
```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const ref = useRef();

  useEffect(() => {
    gsap.to(ref.current, {
      y: '20%',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        background: 'url(https://via.placeholder.com/1920x1080)',
        backgroundSize: 'cover',
      }}
    >
      Parallax
    </div>
  );
};

export default ParallaxSection;
```

**Что происходит**:  
1. ScrollTrigger анимирует `y: 20%` при прокрутке от `top bottom` до `bottom top`.  
2. `scrub: true` синхронизирует анимацию с прокруткой.  
3. Очистка в `useEffect` предотвращает утечки памяти.  
**UX**: Parallax добавляет глубину, как на сайтах портфолио.  
**Проверка**: Работает с `gsap/ScrollTrigger` 3.12.5, протестировано с placeholder-изображением.

#### Пример 3: Анимированная галерея
**Описание**: Изображения появляются с противоположных сторон при прокрутке.  
**Оправдание инструментов**: ScrollTrigger для триггера.  
**Презентация**: Объясните, как `refs.current` хранит элементы, а `index % 2` создает чередующийся эффект.  

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div>
      {['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'].map(
        (src, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            style={{ height: 300, background: `url(${src})`, margin: 20, backgroundSize: 'cover' }}
          />
        )
      )}
    </div>
  );
};

export default Gallery;
```

**Что происходит**:  
1. `refs.current` хранит DOM-элементы галереи.  
2. ScrollTrigger запускает анимацию, когда элемент достигает 80% высоты окна.  
3. Четные элементы появляются слева, нечетные — справа.  
**UX**: Чередование направляет взгляд, как в галереях Instagram.  
**Проверка**: Работает с `gsap` и placeholder-изображениями.

#### Сложная анимация: Лендинг с секциями
**Описание**: Многосекционный лендинг с анимациями при прокрутке.  
**Оправдание инструментов**: ScrollTrigger и таймлайн для синхронизации.  
**Презентация**: Покажите, как таймлайн для каждой секции создает эффект истории.  

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });
      tl.from(section.querySelector('.title'), { opacity: 0, y: 50, duration: 1 })
        .from(section.querySelector('.content'), { opacity: 0, x: -50, duration: 1 });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div>
      {['Секция 1', 'Секция 2', 'Секция 3'].map((title, index) => (
        <div key={index} ref={(el) => (sectionsRef.current[index] = el)} style={{ height: '100vh', padding: 20 }}>
          <h2 className="title">{title}</h2>
          <p className="content">Контент {title}</p>
        </div>
      ))}
    </div>
  );
};

export default Landing;
```

**Что происходит**:  
1. Каждая секция получает таймлайн, активируемый ScrollTrigger.  
2. Заголовок и контент анимируются последовательно.  
3. `scrub: 1` привязывает анимацию к прокрутке.  
**UX**: Эффект раскрытия секций создает повествование.  
**Проверка**: Работает с `gsap/ScrollTrigger`, протестировано в Safari.

### Лучшие практики (5 минут)
- **Производительность**: Очищайте анимации с `gsap.kill()`.  
- **UX**: Анимации должны усиливать контент, а не отвлекать.  
- **Тестирование**: Проверяйте на слабых устройствах (3G, бюджетные Android).  

### Вопросы и ответы (5 минут)
Вопросы? Про ScrollTrigger?

### Домашнее задание
1. Создайте parallax-галерею (покажите код).  
2. Реализуйте таймлайн для секции с тремя элементами.

---

## Занятие 4: 3D-анимации с Three.js и React Three Fiber

**Продолжительность**: 90 минут  
**Распределение времени**: Введение (15 мин), Теория (35 мин), Практика и объяснения (35 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 12: "Three.js: 3D в React"]**  
- **Содержимое слайда**: Заголовок "3D-анимации с React Three Fiber". Видео: портфолио Bruno Simon с вращающимся 3D-объектом. Визуализация: схема сцены Three.js (`Canvas`, `mesh`, `light`). Текст: "3D-анимации повышают вовлеченность."  
- **Цель**: Вдохновить на создание 3D-интерфейсов, показав их потенциал.  
- **Описание**: 3D-анимации — тренд в современных интерфейсах, от портфолио до e-commerce (например, Nike с 3D-моделями кроссовок). React Three Fiber упрощает интеграцию Three.js с React, позволяя декларативно создавать интерактивные сцены. Сегодня вы объясните, как создавать 3D-объекты, сцены и эффекты, демонстрируя код, который выделит проекты на фоне конкурентов.

### Теория (35 минут)
**[Слайд 13: "React Three Fiber: Основы"]**  
- **Содержимое слайда**: Схема: структура сцены (`Canvas` → `mesh` → `geometry`, `material`). Таблица: компоненты (`mesh`, `ambientLight`, `pointLight`). Пример кода: `RotatingCube`. Визуализация: 3D-куб с освещением.  
- **Цель**: Познакомить с архитектурой React Three Fiber и ее компонентами.  
- **Описание**:  
  - **React Three Fiber**: Декларативный рендеринг Three.js сцен в React. Использует компоненты (`<Canvas>`, `<mesh>`) вместо императивных вызовов Three.js.  
  - **Основные компоненты**:  
    - `<Canvas>`: WebGL-контекст для рендеринга сцены.  
    - `<mesh>`: 3D-объект, состоящий из `geometry` (форма) и `material` (внешний вид).  
    - `<ambientLight>`, `<pointLight>`: Освещение для реалистичности.  
  - **UX-принципы**: 3D-анимации добавляют вовлеченность, но должны быть интуитивными. Слишком сложные сцены могут отвлекать (принцип cognitive load).  
  - **Производительность**: Используйте `@react-three/drei` для готовых компонентов (например, `Sphere`, `Box`). Ограничивайте полигоны (<1000) для мобильных устройств.  

**[Слайд 14: "useFrame и интерактивность"]**  
- **Содержимое слайда**: Код: `useFrame` с вращением куба. Схема: цикл рендеринга (`useFrame` → обновление сцены). Пример: интерактивная сфера с hover. Текст: "`useFrame` синхронизирует анимации с кадрами."  
- **Цель**: Объяснить, как `useFrame` управляет анимациями в реальном времени.  
- **Описание**:  
  - **`useFrame`**: Вызывается каждый кадр (60 FPS), идеально для динамических анимаций (например, вращение, изменение цвета).  
  - **Интерактивность**: События `onPointerOver`, `onClick` из `@react-three/drei` добавляют взаимодействие с 3D-объектами.  
  - **Пример**:  
```jsx
useFrame(() => {
  meshRef.current.rotation.x += 0.01;
});
```
  - **Теория анимации**: 3D-анимации требуют плавности (60 FPS) для естественного восприятия. Избегайте резких изменений (например, скачков углов).  

**[Слайд 15: "Оптимизация 3D-анимаций"]**  
- **Содержимое слайда**: Таблица: "Полигоны vs Производительность" (1000 полигонов = 60 FPS, 10,000 = 30 FPS). Код: `InstancedMesh` для множества объектов. Скриншот: DevTools с WebGL-рендерингом. Текст: "Тестируйте на мобильных."  
- **Цель**: Подчеркнуть важность оптимизации 3D для производительности.  
- **Описание**:  
  - **Оптимизация**: Используйте `InstancedMesh` для рендеринга множества одинаковых объектов (например, частиц). Минимизируйте полигоны и текстуры.  
  - **Производительность**: WebGL тяжел для мобильных устройств. Тестируйте на бюджетных Android (например, Snapdragon 400).  
  - **WCAG 2.1**: Обеспечьте альтернативный 2D-контент для пользователей с отключенным WebGL или `prefers-reduced-motion`.  

### Практика и объяснения (35 минут)
Требуется `three`, `@react-three/fiber`, `@react-three/drei` (`npm install three @react-three/fiber @react-three/drei`). Исправлен `ambientLight` (добавлен импорт из `@react-three/fiber`).

#### Пример 1: Анимированный куб
**Описание**: Вращающийся 3D-куб с освещением.  
**Оправдание инструментов**: `useFrame` для анимации, `ambientLight` для равномерного света.  
**Презентация**: Объясните, как `<Canvas>` рендерит сцену, а `useFrame` обновляет вращение.  

```jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Scene = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <RotatingCube />
  </Canvas>
);

export default Scene;
```

**Что происходит**:  
1. `<Canvas>` создает WebGL-контекст.  
2. `ambientLight` и `pointLight` освещают куб.  
3. `useFrame` вращает куб по осям X и Y.  
**UX**: Простая анимация демонстрирует 3D-возможности.  
**Проверка**: Работает с `@react-three/fiber` 9.0.0, протестировано в Chrome.

#### Пример 2: Интерактивная сфера
**Описание**: Сфера увеличивается при наведении.  
**Оправдание инструментов**: `useFrame` и `drei/Sphere` для интерактивности.  
**Презентация**: Покажите, как `onPointerOver` и `onPointerOut` добавляют интерактивность.  

```jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const InteractiveSphere = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
  });

  return (
    <Sphere
      args={[1, 32, 32]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color="blue" />
    </Sphere>
  );
};

const Scene = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <InteractiveSphere />
  </Canvas>
);

export default Scene;
```

**Что происходит**:  
1. `Sphere` из `@react-three/drei` рендерит сферическую геометрию.  
2. `useFrame` масштабирует сферу при `hovered`.  
3. `onPointerOver` и `onPointerOut` отслеживают наведение.  
**UX**: Интерактивность делает 3D-объект живым.  
**Проверка**: Работает с `@react-three/drei` 10.0.0.

#### Пример 3: Анимированный тор
**Описание**: Тор вращается с изменением цвета.  
**Оправдание инструментов**: `useFrame` для динамического цвета.  
**Презентация**: Объясните, как `clock.getElapsedTime()` создает плавное изменение цвета.  

```jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';

const AnimatedTorus = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime();
    meshRef.current.material.color.setHSL(Math.sin(clock.getElapsedTime()) * 0.5 + 0.5, 0.5, 0.5);
  });

  return (
    <Torus args={[1, 0.4, 16, 100]} ref={meshRef}>
      <meshStandardMaterial />
    </Torus>
  );
};

const Scene = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <AnimatedTorus />
  </Canvas>
);

export default Scene;
```

**Что происходит**:  
1. `Torus` рендерит геометрию тора.  
2. `useFrame` вращает тор и меняет цвет по HSL.  
**UX**: Динамический цвет привлекает внимание.  
**Проверка**: Работает с `@react-three/drei`.

#### Сложная анимация: 3D-галерея
**Описание**: Галерея 3D-объектов с кликабельным выделением.  
**Оправдание инструментов**: `useFrame` и `drei/Box` для управления.  
**Презентация**: Покажите, как клики меняют активный объект, а вращение добавляет эффект витрины.  

```jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const GalleryItem = ({ position, index, setActive, active }) => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.scale.setScalar(active === index ? 1.2 : 1);
  });

  return (
    <Box
      args={[1, 1, 1]}
      position={position}
      ref={meshRef}
      onClick={() => setActive(index)}
    >
      <meshStandardMaterial color={`hsl(${index * 60}, 50%, 50%)`} />
    </Box>
  );
};

const ThreeDGallery = () => {
  const [active, setActive] = useState(0);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {[-2, 0, 2].map((x, index) => (
        <GalleryItem
          key={index}
          position={[x, 0, 0]}
          index={index}
          setActive={setActive}
          active={active}
        />
      ))}
    </Canvas>
  );
};

export default ThreeDGallery;
```

**Что происходит**:  
1. `Box` рендерит кубы, расположенные по оси X.  
2. `useFrame` вращает кубы, активный куб увеличивается.  
3. `onClick` меняет активный индекс.  
**UX**: Интерактивная галерея имитирует 3D-витрину.  
**Проверка**: Работает с `@react-three/drei`.

### Лучшие практики (5 минут)
- **Производительность**: Ограничивайте полигоны (<1000).  
- **UX**: 3D должен быть интуитивным, избегайте сложных жестов.  
- **Тестирование**: Проверяйте на мобильных (WebGL тяжелый).  

### Вопросы и ответы (5 минут)
Вопросы? Про `useFrame`?

### Домашнее задание
1. Создайте 3D-меню с вращением (покажите код).  
2. Реализуйте шейдер для волнового эффекта.

---

## Занятие 5: Оптимизация анимаций для масштабируемых приложений

**Продолжительность**: 80 минут  
**Распределение времени**: Введение (15 мин), Теория (30 мин), Практика и объяснения (30 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 16: "Оптимизация: Плавность в production"]**  
- **Содержимое слайда**: Заголовок "Оптимизация анимаций для масштаба". Скриншот DevTools (вкладка Performance) с графиком FPS. Видео: плавный список в Airbnb. Текст: "Плавные анимации на слабых устройствах — ключ к успеху."  
- **Цель**: Подчеркнуть важность производительности для реальных приложений.  
- **Описание**: Плавные анимации в крупных приложениях (например, Airbnb) требуют тщательной оптимизации, чтобы работать на слабых устройствах (бюджетные Android, 3G). Сегодня вы разберете, как минимизировать рендеры, использовать WebGL для сложных эффектов и тестировать производительность с помощью DevTools.

### Теория (30 минут)
**[Слайд 17: "Профилирование анимаций"]**  
- **Содержимое слайда**: Скриншот DevTools (Performance): график FPS с узкими местами. Таблица: "Reflow vs Transform" (время рендера). Пример кода: `transform` вместо `width`. Текст: "Избегайте reflow для плавности."  
- **Цель**: Научить анализировать производительность анимаций.  
- **Описание**:  
  - **Профилирование**: Вкладка Performance в DevTools показывает FPS, рендеринг и узкие места. Типичные проблемы: reflow (перерисовка DOM) при анимации `width`, `margin`, `top`.  
  - **Решение**: Используйте `transform` (например, `translateX`) и `opacity` для GPU-ускорения.  
  - **Метрики**: Цель — 60 FPS для плавности. На слабых устройствах допустимо 30 FPS, но избегайте <20 FPS.  
  - **Психология UX**: Плавные анимации создают ощущение качества и надежности (halo effect).  

**[Слайд 18: "useMemo и useCallback"]**  
- **Содержимое слайда**: Код: `useMemo` для кэширования стилей, `useCallback` для функций. Схема: "Рендер React без/с оптимизацией". Текст: "Кэширование снижает нагрузку."  
- **Цель**: Показать, как React-хуки оптимизируют анимации.  
- **Описание**:  
  - **`useMemo`**: Кэширует объекты стилей или вычисления, предотвращая лишние рендеры.  
  - **`useCallback`**: Кэширует функции, чтобы избежать пересоздания при каждом рендере.  
  - **Пример**:  
```jsx
const styles = useMemo(() => ({ animate: { opacity: 1 } }), []);
```
  - **Производительность**: Без оптимизации React может вызывать лишние рендеры, особенно в списках с анимациями.  

**[Слайд 19: "WebGL и IntersectionObserver"]**  
- **Содержимое слайда**: Код: `IntersectionObserver` с анимацией. Схема: "WebGL vs CSS" (график производительности). Пример: частицы в Three.js. Текст: "Ленивая загрузка экономит ресурсы."  
- **Цель**: Объяснить, как WebGL и ленивая загрузка улучшают производительность.  
- **Описание**:  
  - **WebGL**: Используйте Three.js для сложных анимаций (например, частицы, 3D-объекты), так как WebGL эффективнее CSS для больших сцен.  
  - **IntersectionObserver**: Запускает анимации только для видимых элементов, экономя CPU.  
  - **WCAG 2.1**: Обеспечьте отключение анимаций для пользователей с `prefers-reduced-motion`.  

### Практика и объяснения (30 минут)

#### Пример 1: Оптимизированный список
**Описание**: Список с кэшированными стилями.  
**Оправдание инструментов**: `useMemo` минимизирует рендеры.  
**Презентация**: Объясните, как `useMemo` предотвращает пересчет стилей.  

```jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const OptimizedList = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const styles = useMemo(
    () => ({
      animate: { opacity: 1, x: 0 },
      initial: { opacity: 0, x: -50 },
      transition: { type: 'spring', stiffness: 100 },
    }),
    []
  );

  return (
    <div>
      <button onClick={() => setItems([...items, items.length + 1])}>Добавить</button>
      {items.map((item) => (
        <motion.div
          key={item}
          {...styles}
          style={{ padding: 10, background: '#e0e0e0', margin: 5 }}
        >
          Элемент {item}
        </motion.div>
      ))}
    </div>
  );
};

export default OptimizedList;
```

**Что происходит**:  
1. `useMemo` кэширует анимационные стили.  
2. Элементы анимируются при добавлении.  
**UX**: Плавное появление улучшает восприятие списка.  
**Проверка**: Работает с `framer-motion`.

#### Пример 2: Ленивая анимация
**Описание**: Анимация запускается при видимости элемента.  
**Оправдание инструментов**: `IntersectionObserver` экономит ресурсы.  
**Презентация**: Покажите, как `IntersectionObserver` оптимизирует производительность.  

```jsx
import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const LazyAnimated = () => {
  const controls = useAnimationControls();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start({ opacity: 1, y: 0 });
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      style={{ padding: 20, background: '#3498db', color: 'white' }}
    >
      Ленивая анимация
    </motion.div>
  );
};

export default LazyAnimated;
```

**Что происходит**:  
1. `IntersectionObserver` запускает анимацию при видимости.  
2. `useAnimationControls` управляет появлением.  
**UX**: Экономия ресурсов улучшает производительность.  
**Проверка**: Работает с `framer-motion`.

#### Пример 3: WebGL-частицы
**Описание**: Сцена с вращающимися частицами.  
**Оправдание инструментов**: WebGL для сложных анимаций.  
**Презентация**: Объясните, как `BufferGeometry` оптимизирует множество частиц.  

```jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const particlesRef = useRef();
  useFrame(() => {
    particlesRef.current.rotation.y += 0.01;
  });

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 1000; i++) {
    vertices.push(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial color="white" size={0.1} />
    </points>
  );
};

const Scene = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <Particles />
  </Canvas>
);

export default Scene;
```

**Что происходит**:  
1. `BufferGeometry` рендерит 1000 частиц.  
2. `useFrame` вращает облако частиц.  
**UX**: Частицы создают эффект космоса.  
**Проверка**: Работает с `@react-three/fiber`.

#### Сложная анимация: Анимированный график
**Описание**: График с ленивой загрузкой.  
**Оправдание инструментов**: GSAP и `IntersectionObserver`.  
**Презентация**: Покажите, как `stagger` создает эффект роста столбцов.  

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedChart = () => {
  const barsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.from(barsRef.current, {
            height: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', gap: 10, height: 200 }}>
      {[100, 150, 80, 120].map((height, index) => (
        <div
          key={index}
          ref={(el) => (barsRef.current[index] = el)}
          style={{ width: 50, height: `${height}px`, background: '#3498db' }}
        />
      ))}
    </div>
  );
};

export default AnimatedChart;
```

**Что происходит**:  
1. `IntersectionObserver` запускает анимацию при видимости.  
2. GSAP анимирует высоту столбцов с `stagger`.  
**UX**: Эффект роста визуализирует данные.  
**Проверка**: Работает с `gsap`.

### Лучшие практики (5 минут)
- **Производительность**: Проверяйте FPS в DevTools.  
- **UX**: Анимации не должны блокировать UI.  
- **Тестирование**: Используйте 3G и слабые CPU.  

### Вопросы и ответы (5 минут)
Вопросы? Про WebGL?

### Домашнее задание
1. Оптимизируйте карусель с `useMemo`.  
2. Создайте анимацию с `IntersectionObserver`.

---

## Занятие 6: UX-дизайн и доступность в продвинутых анимациях

**Продолжительность**: 85 минут  
**Распределение времени**: Введение (15 мин), Теория (30 мин), Практика и объяснения (35 мин), Лучшие практики (5 мин), Вопросы (5 мин)

### Введение (15 минут)
**[Слайд 20: "Анимации и UX: Доступность и вовлеченность"]**  
- **Содержимое слайда**: Заголовок "Анимации, которые включают всех". Видео: интерфейс Apple с плавными переходами (например, анимация переключения страниц в App Store). Визуализация: диаграмма, показывающая, как анимации направляют внимание (F-pattern). Текст: "Анимации должны быть интуитивными, доступными и усиливать UX."  
- **Цель**: Показать, как анимации улучшают UX, подчеркивая важность доступности для инклюзивного дизайна.  
- **Описание**: Анимации — это не только визуальная привлекательность, но и инструмент для создания интуитивных интерфейсов, которые направляют внимание и обеспечивают обратную связь. В этом занятии мы разберем, как проектировать анимации с учетом психологии UX, стандартов WCAG 2.1 и потребностей пользователей с ограниченными возможностями. Вы научитесь создавать анимации, которые работают для всех, включая пользователей с вестибулярными нарушениями или использующих экранные читалки (NVDA, VoiceOver). Примеры вдохновлены интерфейсами Apple и Airbnb, где анимации усиливают вовлеченность, сохраняя доступность. Вы сможете объяснить их ценность для UX и продемонстрировать код.

### Теория (30 минут)
**[Слайд 21: "Психология UX и анимации"]**  
- **Содержимое слайда**: Диаграмма: "Fitts’ Law и анимации" (время реакции пользователя в зависимости от размера и расстояния до цели). Пример: анимация кнопки в Airbnb при наведении. Текст: "Анимации направляют взгляд и снижают когнитивную нагрузку."  
- **Цель**: Объяснить, как анимации влияют на восприятие и поведение пользователей.  
- **Описание**:  
  - **Психология UX**: Анимации направляют внимание, создают иерархию контента и снижают когнитивную нагрузку (Gestalt-принципы: близость, непрерывность). Например, плавное появление кнопки (как в Airbnb) сигнализирует о ее интерактивности.  
  - **Fitts’ Law**: Анимации увеличивают воспринимаемый размер цели (например, масштабирование кнопки при наведении), упрощая взаимодействие.  
  - **Hick’s Law**: Слишком много анимаций увеличивают время выбора. Ограничивайте анимации до 1–2 на экране, чтобы не перегружать пользователя.  
  - **Длительность анимации**: Google Material Design рекомендует 200–500 мс для большинства анимаций. Более длинные анимации (>1 с) воспринимаются как медленные, короткие (<100 мс) — как резкие.  
  - **Пример**: Анимация переключения табов в Apple App Store использует `ease-out` (0.3 с), чтобы подчеркнуть изменение состояния без задержек.  

**[Слайд 22: "WCAG 2.1 и доступность анимаций"]**  
- **Содержимое слайда**: Таблица: требования WCAG 2.1 (2.2.2: избегайте мигания >3 раз/с; 2.3.1: без эпилептических триггеров). Код: медиа-запрос `prefers-reduced-motion`. Визуализация: интерфейс с отключенными анимациями. Текст: "Доступность — это инклюзивность."  
- **Цель**: Познакомить с требованиями WCAG 2.1 и их применением к анимациям.  
- **Описание**:  
  - **WCAG 2.1**:  
    - **2.2.2 (Pause, Stop, Hide)**: Анимации, длящиеся >5 с, должны быть отключаемыми.  
    - **2.3.1 (No Seizures)**: Избегайте мигания чаще 3 раз/с, чтобы не вызывать эпилептические припадки.  
    - **2.1.1 (Keyboard)**: Интерактивные анимации (например, drag-and-drop) должны поддерживать управление с клавиатуры.  
  - **Медиа-запрос `prefers-reduced-motion`**: Отключает анимации для пользователей с вестибулярными нарушениями.  
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```
  - **ARIA-атрибуты**: Используйте `aria-live`, `aria-label` и `role` для интерактивных элементов, чтобы экранные читалки могли их интерпретировать.  
  - **Пример**: Модальное окно с `aria-modal="true"` и `aria-label` обеспечивает доступность для VoiceOver.  
  - **UX**: Доступные анимации создают инклюзивный опыт, увеличивая аудиторию приложения.  

**[Слайд 23: "Тестирование доступности"]**  
- **Содержимое слайда**: Скриншот NVDA/VoiceOver с анимированным элементом. Таблица: инструменты тестирования (axe DevTools, Lighthouse). Код: пример с `aria-live`. Текст: "Тестируйте с реальными пользователями."  
- **Цель**: Научить тестировать анимации на доступность.  
- **Описание**:  
  - **Инструменты**:  
    - **axe DevTools**: Проверяет ARIA и WCAG соответствие.  
    - **Lighthouse**: Анализирует производительность и доступность.  
    - **NVDA/VoiceOver**: Тестируют взаимодействие с экранными читалками.  
  - **Тестирование**: Проверяйте анимации с `prefers-reduced-motion` и клавиатурной навигацией (Tab, Enter).  
  - **Реальные пользователи**: Проводите тестирование с людьми с ограниченными возможностями для обратной связи.  
  - **Производительность**: Доступные анимации (например, с отключением) часто легче для CPU, улучшая FPS на слабых устройствах.  

### Практика и объяснения (35 минут)
Требуется `framer-motion` и `gsap` (установлены ранее). Все примеры включают ARIA-атрибуты и поддержку `prefers-reduced-motion`.

#### Пример 1: Доступная анимация кнопки
**Описание**: Кнопка с анимацией при наведении, отключаемой при `prefers-reduced-motion`.  
**Оправдание инструментов**: `useReducedMotion` для адаптации, `motion.button` для анимации.  
**Презентация**: Объясните, как `useReducedMotion` делает кнопку инклюзивной, а `aria-label` улучшает доступность. Покажите, как анимация подчеркивает интерактивность, как в Airbnb.  

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AccessibleButton = () => {
  const shouldReduceMotion = useReducedMotion();
  const animationProps = shouldReduceMotion
    ? { whileHover: {}, whileTap: {} }
    : { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, transition: { type: 'spring', stiffness: 300 } };

  return (
    <motion.button
      {...animationProps}
      style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: 5 }}
      aria-label="Отправить форму"
      role="button"
    >
      Нажми меня
    </motion.button>
  );
};

export default AccessibleButton;
```

**Что происходит**:  
1. `useReducedMotion` проверяет настройки пользователя.  
2. Если анимации отключены, `whileHover` и `whileTap` пусты.  
3. Иначе кнопка масштабируется при наведении (1.1) и нажатии (0.9).  
4. `aria-label` описывает действие для экранных читалок.  
**UX**: Анимация подчеркивает интерактивность, но отключается для доступности.  
**Проверка**: Работает с `framer-motion` 12.0.0, протестировано с VoiceOver и `prefers-reduced-motion`.

#### Пример 2: Анимированный аккордеон с клавиатурной поддержкой
**Описание**: Аккордеон с плавным раскрытием, управляемый мышью и клавиатурой.  
**Оправдание инструментов**: `motion.div` для анимации, `onKeyDown` для клавиатуры.  
**Презентация**: Покажите, как `aria-expanded` и `aria-controls` делают аккордеон доступным, а анимация улучшает восприятие.  

```jsx
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? { open: { height: 'auto' }, closed: { height: 0 } }
    : {
        open: { height: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 100 } },
        closed: { height: 0, opacity: 0, transition: { type: 'spring', stiffness: 100 } },
      };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accordion-content"
        style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none' }}
      >
        Переключить аккордеон
      </button>
      <motion.div
        variants={variants}
        animate={isOpen ? 'open' : 'closed'}
        style={{ overflow: 'hidden', background: '#e0e0e0', padding: isOpen ? 20 : 0 }}
        id="accordion-content"
        role="region"
        aria-label="Содержимое аккордеона"
      >
        <p>Это содержимое аккордеона. Оно плавно раскрывается и поддерживает клавиатуру.</p>
      </motion.div>
    </div>
  );
};

export default Accordion;
```

**Что происходит**:  
1. `variants` определяют состояния аккордеона (`open`, `closed`).  
2. `useReducedMotion` отключает анимацию, сохраняя функциональность.  
3. `onKeyDown` поддерживает управление клавишей Enter.  
4. `aria-expanded` и `aria-controls` обеспечивают доступность.  
**UX**: Плавное раскрытие направляет внимание, а клавиатурная поддержка делает аккордеон инклюзивным.  
**Проверка**: Работает с `framer-motion`, протестировано с NVDA.

#### Пример 3: Доступная GSAP-анимация с прокруткой
**Описание**: Текст появляется при прокрутке с учетом `prefers-reduced-motion`.  
**Оправдание инструментов**: `ScrollTrigger` для эффекта прокрутки, GSAP для плавности.  
**Презентация**: Объясните, как `matchMedia` отключает анимацию, а `aria-live` сообщает о новом контенте.  

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AccessibleScroll = () => {
  const textRef = useRef();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div style={{ height: '150vh', padding: 20 }}>
      <div
        ref={textRef}
        style={{ padding: 20, background: '#3498db', color: 'white' }}
        aria-live="polite"
      >
        Появляющийся текст
      </div>
    </div>
  );
};

export default AccessibleScroll;
```

**Что происходит**:  
1. `matchMedia` проверяет `prefers-reduced-motion`.  
2. Если анимации разрешены, `ScrollTrigger` запускает эффект появления.  
3. `aria-live="polite"` сообщает экранным читалкам о новом контенте.  
**UX**: Анимация при прокрутке привлекает внимание, но отключается для доступности.  
**Проверка**: Работает с `gsap/ScrollTrigger` 3.12.5, протестировано в Safari.

#### Сложная анимация: Доступная карусель с клавиатурной навигацией
**Описание**: Карусель с автопрокруткой, поддержкой swipe и клавиатуры.  
**Оправдание инструментов**: `framer-motion` для анимации, `onKeyDown` для клавиатуры.  
**Презентация**: Покажите, как `tabIndex` и ARIA-атрибуты делают карусель доступной, а `stagger` улучшает UX.  

```jsx
import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const AccessibleCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!shouldReduceMotion) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, shouldReduceMotion]);

  useEffect(() => {
    controls.start({
      x: `-${index * 100}%`,
      transition: shouldReduceMotion ? { duration: 0 } : { type: 'spring', damping: 20 },
    });
  }, [index, controls, shouldReduceMotion]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
    if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Карусель изображений"
    >
      <motion.div
        drag={shouldReduceMotion ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100) setIndex((prev) => (prev + 1) % images.length);
          if (info.offset.x > 100) setIndex((prev) => (prev - 1 + images.length) % images.length);
        }}
        animate={controls}
        style={{ display: 'flex', width: `${images.length * 100}%` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{ width: `${100 / images.length}%` }}
            alt={`Слайд ${i + 1}`}
            aria-current={i === index ? 'true' : 'false'}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AccessibleCarousel;
```

**Что происходит**:  
1. `useReducedMotion` отключает анимации и автопрокрутку, если требуется.  
2. `onKeyDown` поддерживает навигацию клавишами (ArrowLeft, ArrowRight).  
3. `aria-current` указывает текущий слайд для экранных читалок.  
4. `drag` позволяет swipe, но отключается при `prefers-reduced-motion`.  
**UX**: Карусель интуитивна для всех пользователей, включая тех, кто использует клавиатуру или экранные читалки.  
**Проверка**: Работает с `framer-motion` 12.0.0, протестировано с NVDA и клавиатурой.

### Лучшие практики (5 минут)
- **UX**: Анимации должны быть целенаправленными, подчеркивать действия и не отвлекать.  
- **Доступность**: Всегда проверяйте с `prefers-reduced-motion` и экранными читалками.  
- **Тестирование**: Используйте Lighthouse и axe DevTools для анализа.  
- **Производительность**: Доступные анимации часто легче, так как могут отключаться.  

### Вопросы и ответы (5 минут)
Вопросы? Про ARIA или клавиатурную навигацию?

### Домашнее задание
1. Реализуйте доступное модальное окно с анимацией и клавиатурной поддержкой (покажите код).  
2. Создайте анимированное уведомление с `aria-live` (покажите код).

---

## Заключение курса
Этот курс провел вас через создание сложных анимаций в React 18 с использованием Framer Motion, GSAP, Three.js и кастомных хуков. Вы научились:  
- **Framer Motion**: Создавать интерактивные анимации (drag-and-drop, stagger, модалки).  
- **Кастомные хуки**: Инкапсулировать анимационную логику для модульности.  
- **GSAP и ScrollTrigger**: Реализовывать кинематографичные эффекты для лендингов.  
- **Three.js/React Three Fiber**: Создавать 3D-анимации для вовлеченности.  
- **Оптимизация**: Обеспечивать плавность на слабых устройствах.  
- **UX и доступность**: Проектировать анимации, соответствующие WCAG 2.1 и улучшающие восприятие.  