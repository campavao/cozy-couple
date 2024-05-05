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
      <BarChart
        title='Delivery total month over month'
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
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
