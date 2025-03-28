"use client"

import { motion } from "framer-motion"
import React from "react"
import { Mail, Lock, Disc3, Headset } from "lucide-react"
import { SiGitea, SiAuthentik } from "react-icons/si"

const iconMap = {
  Mail,
  Lock,
  Disc3,
  Headset,
  SiGitea,
  SiAuthentik,
} as const

interface AnimatedIconProps {
  iconName: keyof typeof iconMap
  className?: string
}

const AnimatedIcon = ({ iconName, className }: AnimatedIconProps) => {
  const Icon = iconMap[iconName]
  
  return (
    <motion.div
      whileHover={{ rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className={className} />
    </motion.div>
  )
}

export default AnimatedIcon 