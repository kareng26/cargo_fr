import React from "react";
import { motion } from "framer-motion";
import { variants } from "@/pages/tracking/const.ts";
import { Title } from "@/pages/tracking/components";

const AnimatedTitle: React.FC = () => {
    return (
        <motion.div initial={"hidden"} animate={"visible"} variants={variants}>
            <Title>{"CARGO"}</Title>
        </motion.div>
    );
};

export { AnimatedTitle };
