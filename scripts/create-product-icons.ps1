# Copyright 2026 Impact Engines. Original survey-page product glyph, separate from the supplied wordmark.
Add-Type -AssemblyName System.Drawing
$taskRoot = Split-Path -Parent $PSScriptRoot
foreach ($taskSize in @(32, 128)) {
    $taskBitmap = [System.Drawing.Bitmap]::new($taskSize, $taskSize)
    $taskGraphics = [System.Drawing.Graphics]::FromImage($taskBitmap)
    $taskGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $taskGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#2D3E50'))
    $taskGraphics.ScaleTransform($taskSize / 128.0, $taskSize / 128.0)
    $taskOutline = [System.Drawing.Pen]::new([System.Drawing.Color]::White, 5)
    $taskAccent = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#FFA62B'), 6)
    $taskRule = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#A8DADC'), 4)
    $taskGraphics.DrawRectangle($taskOutline, 31, 21, 66, 86)
    foreach ($taskY in @(42, 64, 86)) {
        $taskGraphics.DrawLine($taskRule, 58, $taskY, 81, $taskY)
        $taskGraphics.DrawLines($taskAccent, [System.Drawing.PointF[]]@(
            [System.Drawing.PointF]::new(40, $taskY),
            [System.Drawing.PointF]::new(45, $taskY + 5),
            [System.Drawing.PointF]::new(52, $taskY - 6)
        ))
    }
    $taskBitmap.Save((Join-Path $taskRoot "public/icon-$taskSize.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $taskOutline.Dispose()
    $taskAccent.Dispose()
    $taskRule.Dispose()
    $taskGraphics.Dispose()
    $taskBitmap.Dispose()
}
