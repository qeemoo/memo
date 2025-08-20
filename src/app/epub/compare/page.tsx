'use client';

import { diffLines } from 'diff';
import JSZip from 'jszip';

import { useEffect, useState } from 'react';

import DiffView from '@/components/molecules/DiffView';
import Dropzone from '@/components/molecules/Dropzone';

interface ComparisonResult {
  fileName: string;
  content1: string;
  content2: string;
  diffCount: number;
}

const normalizeLine = (line: string) => line.trim();

const EpubComparePage = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult[]>([]);
  const [activeDiff, setActiveDiff] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file1 && file2) {
      compareEpubs(file1, file2);
    }
  }, [file1, file2]);

  const compareEpubs = async (f1: File, f2: File) => {
    setIsLoading(true);
    try {
      const zip1 = await JSZip.loadAsync(f1);
      const zip2 = await JSZip.loadAsync(f2);

      const files1 = Object.keys(zip1.files);
      const files2 = Object.keys(zip2.files);

      const allFiles = [...new Set([...files1, ...files2])].filter((name) => !name.endsWith('/'));
      const differences: ComparisonResult[] = [];

      for (const fileName of allFiles) {
        const content1 = (await zip1.file(fileName)?.async('string')) || '';
        const content2 = (await zip2.file(fileName)?.async('string')) || '';

        if (content1 !== content2) {
          const lines1 = content1.split('\n');
          const lines2 = content2.split('\n');

          const normalizedLines1 = lines1.map(normalizeLine);
          const normalizedLines2 = lines2.map(normalizeLine);

          const lines2Set = new Set(normalizedLines2);
          const lines1Set = new Set(normalizedLines1);

          let currentDiffCount = 0;
          const diff = diffLines(content1 || '', content2 || '');
          for (let i = 0; i < diff.length; i++) {
            const part = diff[i];
            if (part.removed) {
              const nextPart = diff[i + 1];
              if (nextPart && nextPart.added) {
                // This is a modification (removed followed by added)
                currentDiffCount++;
                i++; // Skip the next part as it's part of this change
              } else {
                // This is a pure deletion
                currentDiffCount++;
              }
            } else if (part.added) {
              // This is a pure addition
              currentDiffCount++;
            }
          }

          differences.push({ fileName, content1, content2, diffCount: currentDiffCount });
        }
      }
      setComparisonResult(differences);
    } catch (error) {
      console.error('Error comparing epubs:', error);
      alert('An error occurred while comparing the epub files.');
    }
    setIsLoading(false);
  };

  const handleDrop1 = (droppedFile: File) => {
    setFile1(droppedFile);
  };

  const handleDrop2 = (droppedFile: File) => {
    setFile2(droppedFile);
  };

  const toggleDiff = (fileName: string) => {
    if (activeDiff === fileName) {
      setActiveDiff(null);
    } else {
      setActiveDiff(fileName);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Epub File Comparison</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropzone isConfirmed={!!file1} onDrop={handleDrop1} />
        <Dropzone isConfirmed={!!file2} onDrop={handleDrop2} />
      </div>

      {isLoading && <p className="text-center mt-4">Comparing files...</p>}

      {comparisonResult.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Differences Found:</h2>
          <div className="flex flex-col space-y-2">
            {comparisonResult.map(({ fileName, content1, content2, diffCount }) => (
              <div key={fileName}>
                <button
                  onClick={() => toggleDiff(fileName)}
                  className="w-full text-left p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  {fileName} ({diffCount}개)
                </button>
                {activeDiff === fileName && (
                  <div className="mt-2">
                    <DiffView content1={content1} content2={content2} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpubComparePage;
