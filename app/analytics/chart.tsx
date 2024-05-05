"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
  BarChart,
} from "recharts";

export function Chart<T extends object>({
  data,
  xKey,
  yKey,
  format,
}: {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  format?: string;
}) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey={xKey as string} />
        <YAxis
          tickFormatter={(value) => (format ? `${format}${value}` : value)}
        />
        <Tooltip />
        <Bar
          dataKey={yKey as string}
          fill='#82ca9d'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
