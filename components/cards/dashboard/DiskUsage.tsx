import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive } from "lucide-react";
import React, { useState } from "react";

export const DiskUsage = () => {
  // TODO: Implement disk usage card logic
  //const [diskUsage, setDiskUsage] = useState(0);
  //const [quotaGB, setQuotaGB] = useState(0);
  //const [quotaUsedGB, setQuotaUsedGB] = useState(0);
  const [diskUsage] = useState(0);
  const [quotaGB] = useState(0);
  const [quotaUsedGB] = useState(0);

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Disk Usage</CardTitle>
        <CardDescription>Your email accounts&apos; disk quota usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <HardDrive className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <Progress value={diskUsage} className="mb-2" />
            <p className="text-sm text-muted-foreground">{quotaUsedGB}GB of {quotaGB}GB used</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};