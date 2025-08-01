const resultEl = document.getElementById('result');

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  resultEl.innerText = 'Bezig met uploaden...';

  const file = document.getElementById('imageInput').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    resultEl.innerText = result?.url || result?.error || 'Er is iets misgegaan.';
  } catch (error) {
    resultEl.innerText = 'Fout bij upload: ' + error.message;
  }
});