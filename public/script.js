document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('imageInput').files[0];
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  document.getElementById('result').innerText = result?.url || result?.error || 'Er is iets misgegaan.';
});
