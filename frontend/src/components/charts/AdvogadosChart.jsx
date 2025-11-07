import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function AdvogadosChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d33" />
          <XAxis dataKey="dia" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1c23", border: "1px solid #333" }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line type="monotone" dataKey="sem_doc" stroke="#ff4d4f" name="Sem CPF/CNPJ" strokeWidth={2} />
          <Line type="monotone" dataKey="com_cpf" stroke="#1677ff" name="Com CPF" strokeWidth={2} />
          <Line type="monotone" dataKey="com_cnpj" stroke="#52c41a" name="Com CNPJ" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
