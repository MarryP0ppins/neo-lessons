import type { ReactNode } from "react";
import {
  AccessibleComponent,
  AnimatedList,
  Carousel,
  DraggableCard,
  Modal,
  ProgressBar,
  StaggerList,
  ListItems,
  HeroTimeline,
  ParallaxDemo,
  Gallery,
  Landing,
  Scene,
  InteractiveSphereScene,
  AnimatedTorusScene,
  ThreeDGallery,
  OptimizedList,
  LazyAnimated,
  ParticlesScene,
  AnimatedGraph,
  AccessibleButton,
  Accordion,
  AccessibleScroll,
  AccessibleCarousel,
} from "./pages";

export type NavConfig = {
  path: string;
  title: string;
  page?: () => ReactNode;
  subpath?: NavConfig[];
};

export const CONFIG: NavConfig[] = [
  {
    path: "lesson-1",
    title: "Занятие 1: Framer Motion",
    subpath: [
      {
        title: "Пример 1: Drag-and-Drop карточка",
        path: "1",
        page: () => <DraggableCard />,
      },
      {
        title: "Пример 2: Анимированный список с stagger",
        path: "2",
        page: () => <AnimatedList />,
      },
      {
        title: "Пример 3: Анимированная модалка с порталом",
        path: "3",
        page: () => <Modal />,
      },
      {
        title: "Сложная анимация: Карусель с жестами",
        path: "4",
        page: () => <Carousel />,
      },
    ],
  },
  {
    path: "lesson-2",
    title: "Занятие 2: Кастомные хуки для анимаций",
    subpath: [
      {
        title: "Пример 1: Хук для stagger-анимации",
        path: "1",
        page: () => <StaggerList />,
      },
      {
        title: "Пример 2: Хук для прогресс-анимации",
        path: "2",
        page: () => <ProgressBar />,
      },
      {
        title: "Пример 3: Хук для доступности",
        path: "3",
        page: () => <AccessibleComponent />,
      },
      {
        title: "Сложная анимация: Хук для анимированного фильтра",
        path: "4",
        page: () => <ListItems />,
      },
    ],
  },
  {
    path: "lesson-3",
    title: "Занятие 3: GSAP и ScrollTrigger для сложных эффектов",
    subpath: [
      {
        title: "Пример 1: Таймлайн для hero-секции",
        path: "1",
        page: () => <HeroTimeline />,
      },
      {
        title: "Пример 2: Parallax-эффект",
        path: "2",
        page: () => <ParallaxDemo />,
      },
      {
        title: "Пример 3: Анимированная галерея",
        path: "3",
        page: () => <Gallery />,
      },
      {
        title: "Сложная анимация: Лендинг с секциями",
        path: "4",
        page: () => <Landing />,
      },
    ],
  },
  {
    path: "lesson-4",
    title: "Занятие 4: 3D-анимации с Three.js и React Three Fiber",
    subpath: [
      {
        title: "Пример 1: Анимированный куб",
        path: "1",
        page: () => <Scene />,
      },
      {
        title: "Пример 2: Интерактивная сфера",
        path: "2",
        page: () => <InteractiveSphereScene />,
      },
      {
        title: "Пример 3: Анимированный тор",
        path: "3",
        page: () => <AnimatedTorusScene />,
      },
      {
        title: "Сложная анимация: 3D-галерея",
        path: "4",
        page: () => <ThreeDGallery />,
      },
    ],
  },
  {
    path: "lesson-5",
    title: "Занятие 5: Оптимизация анимаций для масштабируемых приложений",
    subpath: [
      {
        title: "Пример 1: Оптимизированный список",
        path: "1",
        page: () => <OptimizedList />,
      },
      {
        title: "Пример 2: Ленивая анимация",
        path: "2",
        page: () => <LazyAnimated />,
      },
      {
        title: "Пример 3: WebGL-частицы",
        path: "3",
        page: () => <ParticlesScene />,
      },
      {
        title: "Сложная анимация: Анимированный график",
        path: "4",
        page: () => <AnimatedGraph />,
      },
    ],
  },
  {
    path: "lesson-6",
    title: "Занятие 6: UX-дизайн и доступность в продвинутых анимациях",
    subpath: [
      {
        title: "Пример 1: Доступная анимация кнопки",
        path: "1",
        page: () => <AccessibleButton />,
      },
      {
        title: "Пример 2: Анимированный аккордеон с клавиатурной поддержкой",
        path: "2",
        page: () => <Accordion />,
      },
      {
        title: "Пример 3: Доступная GSAP-анимация с прокруткой",
        path: "3",
        page: () => <AccessibleScroll />,
      },
      {
        title: "Сложная анимация: Доступная карусель с клавиатурной навигацией",
        path: "4",
        page: () => <AccessibleCarousel />,
      },
    ],
  },
];
