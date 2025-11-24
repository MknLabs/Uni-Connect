import * as React from "react"
import { createMap } from "svg-dotted-map"

import { cn } from "@/lib/utils"

interface Marker {
    lat: number
    lng: number
    size?: number
}

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
    width?: number
    height?: number
    mapSamples?: number
    markers?: Marker[]
    dotColor?: string
    markerColor?: string
    dotRadius?: number
    stagger?: boolean
}

export function DottedMap({
    width = 150,
    height = 75,
    mapSamples = 5000,
    markers = [],
    markerColor = "#FF6900",
    dotRadius = 0.2,
    stagger = true,
    className,
    style,
}: DottedMapProps) {
    const { points, addMarkers } = createMap({
        width,
        height,
        mapSamples,
    })

    const processedMarkers = addMarkers(markers)

    // Compute stagger helpers in a single, simple pass
    const { xStep, yToRowIndex } = React.useMemo(() => {
        const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
        const rowMap = new Map<number, number>()
        let step = 0
        let prevY = Number.NaN
        let prevXInRow = Number.NaN

        for (const p of sorted) {
            if (p.y !== prevY) {
                // new row
                prevY = p.y
                prevXInRow = Number.NaN
                if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
            }
            if (!Number.isNaN(prevXInRow)) {
                const delta = p.x - prevXInRow
                if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
            }
            prevXInRow = p.x
        }

        return { xStep: step || 1, yToRowIndex: rowMap }
    }, [points])

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn("text-gray-500 dark:text-gray-500", className)}
            style={{ width: "100%", height: "100%", ...style }}
        >
            {points.map((point, index) => {
                const rowIndex = yToRowIndex.get(point.y) ?? 0
                const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
                return (
                    <circle
                        cx={point.x + offsetX}
                        cy={point.y}
                        r={dotRadius}
                        fill="currentColor"
                        key={`${point.x}-${point.y}-${index}`}
                    />
                )
            })}
            {processedMarkers.map((marker, index) => {
                const rowIndex = yToRowIndex.get(marker.y) ?? 0
                const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
                return (
                    <circle
                        cx={marker.x + offsetX}
                        cy={marker.y}
                        r={marker.size ?? dotRadius}
                        fill={markerColor}
                        key={`${marker.x}-${marker.y}-${index}`}
                    />
                )
            })}
        </svg>
    )
}


const markers = [
    {
        lat: 40.7128,
        lng: -74.006,
        size: 0.3,
    }, // New York
    {
        lat: 34.0522,
        lng: -118.2437,
        size: 0.3,
    }, // Los Angeles
    {
        lat: 51.5074,
        lng: -0.1278,
        size: 0.3,
    }, // London
    {
        lat: -33.8688,
        lng: 151.2093,
        size: 0.3,
    }, // Sydney
    {
        lat: 48.8566,
        lng: 2.3522,
        size: 0.3,
    }, // Paris
    {
        lat: 35.6762,
        lng: 139.6503,
        size: 0.3,
    }, // Tokyo
    {
        lat: 55.7558,
        lng: 37.6176,
        size: 0.3,
    }, // Moscow
    {
        lat: 39.9042,
        lng: 116.4074,
        size: 0.3,
    }, // Beijing
    {
        lat: 28.6139,
        lng: 77.209,
        size: 0.3,
    }, // New Delhi
    {
        lat: -23.5505,
        lng: -46.6333,
        size: 0.3,
    }, // São Paulo
    {
        lat: 1.3521,
        lng: 103.8198,
        size: 0.3,
    }, // Singapore
    {
        lat: 25.2048,
        lng: 55.2708,
        size: 0.3,
    }, // Dubai
    {
        lat: 52.52,
        lng: 13.405,
        size: 0.3,
    }, // Berlin
    {
        lat: 19.4326,
        lng: -99.1332,
        size: 0.3,
    }, // Mexico City
    {
        lat: -26.2041,
        lng: 28.0473,
        size: 0.3,
    }, // Johannesburg
]

export function DottedMapComponent() {
    return (
        <div className="py-6">
            <DottedMap markers={markers} />
        </div>
    )
}

