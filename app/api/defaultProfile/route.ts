import path from 'path';
import fs from 'fs';
import {NextResponse} from 'next/server';


export async function GET() {
  const cvfilePath = path.join(process.cwd(), 'data', 'default-cv.json');
  const clfilePath = path.join(process.cwd(), 'data', 'default-cl.json');
  const cvfileContent = fs.readFileSync(cvfilePath, 'utf-8');
  const clfileContent = fs.readFileSync(clfilePath, 'utf-8');
  const cvdata = JSON.parse(cvfileContent);
  const cldata = JSON.parse(clfileContent);
  return NextResponse.json({ resume: cvdata, coverLetter: cldata });

}
