import { motion, Variant } from 'framer-motion';

type Props = {
  x?: number;
  y?: number;
  once?: boolean;
  delay?: number;
  duration?: number;
} & {
  [p: string]: any;
};

export class motions {
  static fadeDiv = (props: Props) => (
    <motion.div
      initial={{
        opacity: 0,
        translateX: `${props.x ?? 0}px`,
        translateY: `${props.y ?? 0}px`,
      }}
      whileInView={{
        opacity: 1,
        translateX: '0px',
        translateY: '0px',
      }}
      transition={{
        delay: props.delay ?? 0.1,
        duration: props.duration ?? 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: props.once }}
      {...props}
    />
  );

  static keyDiv = (
    props: {
      show: Variant;
      hide: Variant;
    } & {
      [p: string]: any;
    }
  ) => (
    <motion.div
      initial={'hide'}
      variants={{
        show: props.show,
        hide: props.hide,
      }}
      transition={{
        delay: props.delay ?? 0.1,
        duration: props.duration ?? 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    />
  );
}
