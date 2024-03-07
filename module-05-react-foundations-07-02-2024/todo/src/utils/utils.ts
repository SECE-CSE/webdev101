export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};
  
// tailwindcss classnames merger
export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};
