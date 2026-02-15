import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3 className="text-3xl font-bold text-center">
        Human Resource Management System Lite
      </h3>
    </div>
  );
}
