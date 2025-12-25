"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";

type QueryDatabaseArgs = {
    query: string;
};

type QueryDatabaseResult = {
    success: boolean;
    data?: Record<string, unknown>[];
    rowCount?: number;
    error?: string;
};

export const QueryDatabaseUI = makeAssistantToolUI<QueryDatabaseArgs, QueryDatabaseResult>({
    toolName: "queryDatabase",

    render: ({ args, result }) => {
        if (!result) {
            return (
                <div className="p-4 border rounded-lg bg-blue-50 animate-pulse">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <p className="text-blue-700 font-medium">Executing SQL query...</p>
                    </div>
                    <code className="mt-2 block text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                        {args.query}
                    </code>
                </div>
            );
        }

        if (!result.success) {
            return (
                <div className="p-4 border rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2 text-red-800">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium">SQL Error</p>
                    </div>
                    <p className="mt-1 text-sm text-red-700">{result.error}</p>
                    <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">Query:</p>
                        <code className="mt-1 block text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                            {args.query}
                        </code>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-green-800">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium">Query Successful</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {result.rowCount} rows
                    </span>
                </div>

                <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Query:</p>
                    <code className="block text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                        {args.query}
                    </code>
                </div>

                {result.data && result.data.length > 0 ? (
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Results:</p>
                        <div className="overflow-x-auto border rounded">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {Object.keys(result.data[0]).map((key) => (
                                            <th key={key} className="px-3 py-2 text-left font-medium text-gray-700">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {result.data.slice(0, 10).map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            {Object.values(row).map((value, j) => (
                                                <td key={j} className="px-3 py-2">
                                                    <div className="max-w-xs truncate">
                                                        {String(value)}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {result.data.length > 10 && (
                                <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-t">
                                    Showing 10 of {result.data.length} rows
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">No data returned</p>
                )}
            </div>
        );
    },
});