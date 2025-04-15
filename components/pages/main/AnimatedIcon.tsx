"use client"

import React from "react"
import { motion } from "motion/react"
import { Mail, Lock, Disc3 } from "lucide-react"
import { SiGitea, SiAuthentik, SiNextcloud } from "react-icons/si"

const iconMap = {
  Mail,
  Lock,
  Disc3,
  SiNextcloud,
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