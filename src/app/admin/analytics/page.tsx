'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useAdminAnalyticsData } from '@/hooks/use-admin-analytics-data';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  users: {
    label: 'New Users',
    color: 'hsl(var(--chart-1))',
  },
  volume: {
    label: 'Volume',
    color: 'hsl(var(--chart-2))',
  },
  savings: { label: 'Savings', color: 'hsl(var(--chart-1))' },
  checking: { label: 'Checking', color: 'hsl(var(--chart-2))' },
  joint: { label: 'Joint', color: 'hsl(var(--chart-3))' },
  full_refund: { label: 'Full Refund', color: 'hsl(var(--chart-4))' },
  other: { label: 'Other', color: 'hsl(var(--chart-5))' },
};

function AnalyticsLoadingSkeleton() {
    return (
        <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[250px] w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Skeleton className="h-[250px] w-[250px] rounded-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function AnalyticsPage() {
  const { data, isLoading } = useAdminAnalyticsData();

  if (isLoading || !data) {
      return <AnalyticsLoadingSkeleton />;
  }

  const { monthlyData, accountTypeDistribution } = data;
  
  const Y_AXIS_WIDTH = 60;


  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User & Transaction Analytics</CardTitle>
          <CardDescription>Monthly new users and approved transaction volume.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={monthlyData} margin={{ left: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                yAxisId="users"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={Y_AXIS_WIDTH}
                tickFormatter={(value) => `${value}`}
              />
               <YAxis
                yAxisId="volume"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={Y_AXIS_WIDTH}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
               <ChartLegend content={<ChartLegendContent />} />
              <Bar
                yAxisId="users"
                dataKey="users"
                fill="var(--color-users)"
                radius={4}
              />
              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill="var(--color-volume)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
       <Card>
          <CardHeader>
            <CardTitle>Account Type Distribution</CardTitle>
            <CardDescription>A breakdown of user account types.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[300px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={accountTypeDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        {accountTypeDistribution.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={`var(--color-${entry.name.toLowerCase().replace(' ', '_')})`} />
                        ))}
                    </Pie>
                    <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                    />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  );
}
