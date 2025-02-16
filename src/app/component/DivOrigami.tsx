// import React, { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { twMerge } from "tailwind-merge";

// export const DivOrigami = () => {
//   return (
//     <section className="flex flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto  px-4 py-12">
//       <LogoRolodex
//         items={[
          
//           <LogoItem key={2} className=" bg-black text-red border-5 h-[50px]">
// الغد المشرق للبرمجيات          </LogoItem>,
          
//           <LogoItem key={3} className="bg-black text-red border-5 h-[50px]">
//             نتميز بالإبداع
//           </LogoItem>,
//           <LogoItem key={4} className="bg-black text-red border-5 h-[50px]">
//             خبرة لا مثيل لها
//           </LogoItem>,
//           <LogoItem key={5} className="bg-black text-red border-5 h-[50px]">
//             شركاء نجاحك
//           </LogoItem>,
//         ]}
//       />
//     </section>
//   );
// };

// const DELAY_IN_MS = 2500;
// const TRANSITION_DURATION_IN_SECS = 1.5;

// const LogoRolodex = ({ items }) => {
//   const intervalRef = useRef(null);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setIndex((pv) => pv + 1);
//     }, DELAY_IN_MS);

//     return () => {
//       clearInterval(intervalRef.current || undefined);
//     };
//   }, []);

//   return (
//     <div
//       className="relative z-0 h-20 w-full max-w-2xl shrink-0 rounded-xl flex flex-row overflow-hidden"
//     >
//       <AnimatePresence mode="sync">
//         <motion.div
//           key={index}
//           transition={{
//             duration: TRANSITION_DURATION_IN_SECS,
//             ease: "easeInOut",
//           }}
//           initial={{ x: "100%", opacity: 0 }}
//           animate={{ x: "0%", opacity: 1 }}
//           exit={{ x: "-100%", opacity: 0 }}
//           className="flex flex-row gap-6 p-4 w-full justify-center items-center"
//         >
//           {items[index % items.length]}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const LogoItem = ({ children, className }) => {
//   return (
//     <div
//       className={twMerge(
//         "flex items-center justify-center h-36 w-48 rounded-lg text-2xl text-neutral-50 font-semibold",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// };

// export default DivOrigami;
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DivOrigami = () => {
  return (
    <section className="flex flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto px-4 py-12">
      <LogoRolodex
        items={[
          <LogoItem key={2} className=" bg-black text-red border-5 h-[50px]">
            الغد المشرق للبرمجيات
          </LogoItem>,
          <LogoItem key={3} className="bg-black text-red border-5 h-[50px]">
            نتميز بالإبداع
          </LogoItem>,
          <LogoItem key={4} className="bg-black text-red border-5 h-[50px]">
            خبرة لا مثيل لها
          </LogoItem>,
          <LogoItem key={5} className="bg-black text-red border-5 h-[50px]">
            شركاء نجاحك
          </LogoItem>,
        ]}
      />
    </section>
  );
};

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

// تحديد نوع props في LogoRolodex
type LogoRolodexProps = {
  items: React.ReactNode[]; // مصفوفة من العناصر التي يمكن أن تحتوي على مكونات أو نصوص
};

const LogoRolodex = ({ items }: LogoRolodexProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, []);

  return (
    <div className="relative z-0 h-20 w-full max-w-2xl shrink-0 rounded-xl flex flex-row overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          className="flex flex-row gap-6 p-4 w-full justify-center items-center"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LogoItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center h-36 w-48 rounded-lg text-2xl text-neutral-50 font-semibold",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DivOrigami;
