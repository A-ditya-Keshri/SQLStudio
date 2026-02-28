import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AssignmentListing from './components/AssignmentListing/AssignmentListing';
import SQLStudio from './components/SQLStudio/SQLStudio';
import './App.scss';

function App() {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

    return (
        <div className="app">
            <Navbar />
            <main className="container">
                {!selectedAssignmentId ? (
                    <AssignmentListing onSelectAssignment={setSelectedAssignmentId} />
                ) : (
                    <SQLStudio
                        assignmentId={selectedAssignmentId}
                        onBack={() => setSelectedAssignmentId(null)}
                    />
                )}
            </main>
            <footer className="footer container">
                <p>&copy; 2024 CipherSQLStudio. Built for SQL Learners.</p>
            </footer>
        </div>
    );
}

export default App;
