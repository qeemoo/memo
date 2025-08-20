'use client';

interface DiffViewProps {
  content1: string;
  content2: string;
}

const normalizeLine = (line: string) => line.trim();

const DiffView = ({ content1, content2 }: DiffViewProps) => {
  const lines1 = content1.split('\n');
  const lines2 = content2.split('\n');

  const normalizedLines1 = lines1.map(normalizeLine);
  const normalizedLines2 = lines2.map(normalizeLine);

  const lines2Set = new Set(normalizedLines2);
  const lines1Set = new Set(normalizedLines1);

  return (
    <div className="grid grid-cols-2 gap-4 font-mono text-sm">
      <div>
        <h3 className="font-bold border-b mb-2">File 1 (기준)</h3>
        <pre className="bg-gray-100 p-2 rounded-md whitespace-pre-wrap">
          {lines1.map((line, index) => {
            const normalizedLine = normalizedLines1[index];
            const isUnique = !lines2Set.has(normalizedLine);
            const color = isUnique ? 'text-red-500' : 'text-gray-700';
            return (
              <div key={index} className={color}>
                <span className="w-8 inline-block text-gray-500 text-right pr-2">{index + 1}</span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
      <div>
        <h3 className="font-bold border-b mb-2">File 2 (비교 대상)</h3>
        <pre className="bg-gray-100 p-2 rounded-md whitespace-pre-wrap">
          {lines2.map((line, index) => {
            const normalizedLine = normalizedLines2[index];
            const isUnique = !lines1Set.has(normalizedLine);
            const color = isUnique ? 'text-green-500' : 'text-gray-700';
            return (
              <div key={index} className={color}>
                <span className="w-8 inline-block text-gray-500 text-right pr-2">{index + 1}</span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default DiffView;
